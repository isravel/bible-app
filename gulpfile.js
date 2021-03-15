/*! SASS Declaration  */

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var webserver = require('gulp-webserver');
var sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
var rtlcss = require('gulp-rtlcss');
var rename = require('gulp-rename');

/*! SVG Declaration  */

var path = require('path');
var Vinyl = require('vinyl');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var svgmin = require('gulp-svgmin');
var cheerio = require('cheerio');
var svgstore = require('gulp-svgstore');
var through2 = require('through2');
var postcss = require('gulp-postcss');
var postcss_scss = require('postcss-scss');
var scss;
sass.compiler = require('node-sass');
var stripInlineComments = require('postcss-strip-inline-comments');
var processors = [stripInlineComments];

/*! Variable Declaration  */

var webPath = '';
var cssPath = './public';
var scssPath = './public/scss/**/*.scss';
var cssMapPath = './maps'; // Map path is RELATIVE to the css path
// var compresstype = 'compressed';
var compresstype = 'compact';
var autoprefixBrowsers = ["last 10 version", "> 1%", "IE 10"];

var iconPath = 'public/svg/icons/*.svg';
var svgHtmlPath = 'public/svg/inline-svg.html';
var svgJsonPath = 'metadata.json';
var iconDestPath = 'public/svg';


/*! Webserver Function  */

gulp.task('webserver', done => {
  gulp.src('./' + webPath)
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 1800,
      directoryListing: {
        enable: true,
        path: webPath
      }
    }));
});

/*! SASS Function  */

gulp.task('sass', done => {
  return gulp.src(scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: compresstype
    }).on('error', sass.logError))
    .pipe(postcss(processors, {
      syntax: postcss_scss
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: autoprefixBrowsers,
      grid: true
    }))
    .pipe(cleanCSS({
      format: 'keep-breaks',
      afterComment: true,
    }))
    .pipe(sourcemaps.write(cssMapPath))
    .pipe(gulp.dest(cssPath + '/css'))
  done();
});

/*! RTL support */
gulp.task('rtl', done => {
    return gulp.src(scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: compresstype
        }).on('error', sass.logError))
        .pipe(postcss(processors, {
            syntax: scss
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: autoprefixBrowsers,
            grid: true
        }))
        .pipe(cleanCSS({
            format: 'keep-breaks',
            afterComment: true,
        }))
        .pipe(rtlcss())
        .pipe(rename({
            suffix: '-rtl'
        }))
        .pipe(sourcemaps.write(cssMapPath))
        .pipe(gulp.dest(cssPath + '/css-rtl'));
    done();
});

/*! SVG HTML Function  */

gulp.task('svginlinehtml', done => {
    var svgs = gulp
        .src(iconPath)

    function fileContents(filePath, file) {
        return file.contents.toString();
    }
    return gulp
        .src(svgHtmlPath)
        .pipe(inject(svgs, {
            transform: fileContents
        }))
        .pipe(gulp.dest(iconDestPath));
    done();
});

/*! SVG JSON Function  */

gulp.task('metadata', done => {
    return gulp
        .src(iconPath)
        .pipe(svgmin(function(file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                        removeViewBox: false
                    },
                    {
                        cleanupIDs: {
                            prefix: prefix + '-',
                            minify: true
                        }
                    }
                ]
            }
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename({
            prefix: 'sprite-'
        }))
        .pipe(through2.obj(function(file, encoding, cb) {
            var $ = cheerio.load(file.contents.toString(), {
                xmlMode: true
            });
            var data = $('svg > symbol').map(function() {
                return {
                    name: $(this).attr('id'),
                    viewBox: $(this).attr('viewBox')
                };
            }).get();
            var jsonFile = new Vinyl({
                path: svgJsonPath,
                contents: Buffer.from(JSON.stringify(data))
            });
            this.push(jsonFile);
            this.push(file);
            cb();
        }))
        .pipe(gulp.dest(iconDestPath));
    done();
});

/*! Watch files function */

gulp.task('watch', done => {
    gulp.watch(scssPath, gulp.series('sass'));
    gulp.watch(iconPath, gulp.series('metadata', 'svginlinehtml'));
    done();
});

/*! SVG Compile function */

gulp.task('svg', gulp.parallel('metadata', 'svginlinehtml'));

/*! Compile all files */

gulp.task('build', gulp.parallel('sass', 'rtl', 'svg'));

/*! Start the server */

gulp.task('start', gulp.parallel('sass', 'rtl', 'svg', 'watch'));

/*! Guulp server for HTML */

gulp.task('serve', gulp.parallel('sass', 'rtl', 'svg', 'webserver', 'watch'));
