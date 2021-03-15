var express = require('express');// newly edited
var router = express.Router();
var util = require("util");
var fs = require("fs");
var path = require('path');
var url = require('url');
var async = require('async');
var fieldConstant = require('../utils/fieldConstants');
const e = require('express');


/* GET users listing. */
router.get('/getFullDetails', function (req, res, next) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var limit = url_parts.query.limit;
	var langReceived = url_parts.query.lang;
	var db = req.con;
	var langColumn = '';
	if (langReceived === 'ta') {
		langColumn = fieldConstant.tamil;
	}
	else {
		langColumn = fieldConstant.english;
	}
	// var query4 = "select " + fieldConstant.Verse + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = 0 LIMIT " + limit + "";

	var data = {};
	async.waterfall([
		function (parallel_done) {
			let query1 = "select " + fieldConstant.english + " , " + langColumn + ", id from " + fieldConstant.books;
			db.query(query1, {}, function (err, results) {
				if (err) return parallel_done(err);
				var result = results.map(function (chap) {
					var chapObj = {};
					chapObj.bookId = chap.id;
					chapObj.id = chap.english.substr(0,3)+chap.id;
					chapObj.key = 'Boo'+chap.id;
					chapObj.user = chap.english;
					if (langReceived === 'ta') {
						chapObj.human = chap.tamil;
					}
					else {
						chapObj.human = chap.english;
					}
					return chapObj;
				})
				data.books = result;
				parallel_done();
			});
		}
		,
		function (parallel_done) {
			var query2 = "select distinct " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = 0";
			db.query(query2, {}, function (err, results) {
				if (err) return parallel_done(err);
				var chapList = [];
				var chapObj = {};
				chapObj.book = 0;
				chapObj.id = 'Boo'+0;
				chapObj.chapters = results.map(res =>{
					let chapterDetails = {}
					chapterDetails.id = 'Cha'+res.Chapter
					chapterDetails.Chapter = res.Chapter
					return chapterDetails
				})
				chapList.push(chapObj);
				data.chapters = chapList;
				parallel_done();
			});
		},
		function (parallel_done) {
			var query3 = "select " + fieldConstant.VerseCount + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = 0 and " + fieldConstant.Chapter + " = 1";
			db.query(query3, {}, function (err, results) {
				if (err) return parallel_done(err);
				var verseList = [];
				var verseNoObj = {};
				verseNoObj.id = 'Cha'+1;
				verseNoObj.chapter = 1;
				verseNoObj.verse = results.map(res => {
					let verseCountDetails = {}
					verseCountDetails.id = 'Cha'+ 1 +res.VerseCount
					verseCountDetails.key = 'Ver'+res.VerseCount
					verseCountDetails.VerseCount = res.VerseCount
					return verseCountDetails
				})
				verseList.push(verseNoObj);
				data.versecounts = verseList;
				parallel_done();
			});
		},
		// function (parallel_done) {
		// 	Promise.all([promise1(req)])
		// 		.then(result => {
		// 			try {
		// 				// data.push(result);
		// 				data.verses = (result);
		// 			}
		// 			catch
		// 			{
		// 				res.status(500).json({ success: false});
		// 			}
		// 			finally{
		// 				parallel_done()
		// 			}
		// 		});
		// 	//
		// },
		//Works fine
		// function (parallel_done) {
		// 	// var url = require('url');
		// 	// var db = req.con;
		// 	// var url_parts = url.parse(req.url, true);
		// 	// var limit = url_parts.query.limit;
		// 	// var lang = url_parts.query.lang;
		// 	var query4 = "select " + fieldConstant.VerseCount + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = 0 and " + fieldConstant.Chapter + " = 1";
		//
		// 	return db.query(query4, {}, function (err, results, fields) {
		// 		if (err) return (err);
		// 		// var verseNoObj = {};
		// 		// verseNoObj.chapter = 1;
		// 		// verseNoObj.verse= results
		// 		// data.versecounts = verseNoObj;
		// 		var stringFormat = JSON.stringify(results);
		// 		var verseObj = JSON.parse(stringFormat);
		// 		//
		// 		var listCount = 0;
		// 		var verseDetails = [];
		// 		async.forEach(results, function (verse, callBack) {
		// 			var stringFormat = JSON.stringify(verse);
		// 			var verseCountObj = JSON.parse(stringFormat);
		// 			var sql = "select " + fieldConstant.Verse + " from " + fieldConstant.bible_ + langReceived + " where Versecount = " + verseCountObj.VerseCount + " and " + fieldConstant.Chapter + " = 1 and " + fieldConstant.Book + " = 0";
		//
		// 			// data.sql =  sql;
		// 			db.query(sql, {}, function (err, result, next) {
		// 				if (err) return (err);
		// 				var stringFormat = JSON.stringify(result);
		// 				var verseObj = JSON.parse(stringFormat);
		//
		// 				listCount++;
		// 				let verseList = {};
		// 				verseList.book = 0;
		// 				verseList.chapter = 1;
		// 				verseList.verseCount = verseCountObj.VerseCount;
		// 				verseList.verse = result[0].Verse;
		// 				verseDetails.push(verseList);
		// 				//
		// 				// if(listCount == results.length){
		// 				// 	resolve(results);
		// 				//   }
		// 				callBack(null);
		// 			});
		// 			// resolve(data);
		// 		}, function (datas) {
		// 			data.verses = verseDetails;
		// 			parallel_done();
		// 		}
		// 		);
		// 	});
		// },
		function (parallel_done) {
			var query4 = "select " + fieldConstant.VerseCount +" , "+ fieldConstant.Verse + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = 0 and " + fieldConstant.Chapter + " = 1";

			return db.query(query4, {}, function (err, results, fields) {
				if (err) return (err);
				var stringFormat = JSON.stringify(results);
				var verseObj = JSON.parse(stringFormat);
				//
				var listCount = 0;

				var verseDetails = [];
				let verseData = [];
				async.forEach(results, function (verse, callBack) {
						var stringFormat = JSON.stringify(verse);
						var verseCountObj = JSON.parse(stringFormat);
						var sql = "select " + fieldConstant.Verse + " from " + fieldConstant.bible_ + langReceived + " where Versecount = " + verseCountObj.VerseCount + " and " + fieldConstant.Chapter + " = 1 and " + fieldConstant.Book + " = 0";
						let verseList = {};
						verseList.id = 'Ver'+verseCountObj.VerseCount;
						verseList.verseCount = verseCountObj.VerseCount;
						verseList.verse = verseCountObj.Verse;
						// bookList.verse(verseList);
						verseData.push(verseList);
						callBack(null);
						// data.sql =  sql;
						// db.query(sql, {}, function (err, result, next) {
						// 	if (err) return (err);
						// 	var stringFormat = JSON.stringify(result);
						// 	var verseObj = JSON.parse(stringFormat);
						//
						// 	listCount++;
						// 	let verseList = {};
						// 	// verseList.book = 0;
						// 	// verseList.chapter = 1;
						// 	verseList.verseCount = verseCountObj.VerseCount;
						// 	verseList.verse = result[0].Verse;
						// 	// bookList.verse(verseList);
						// 	verseData.push(verseList);
						// 	callBack(null);
						// });

						// resolve(data);
					}, function (datas) {
						var book = "";
						if (langReceived === 'ta') {
							book = 'ஆதியாகமம்';
						}
						else {
							book = 'Genesis';
						}
						var bookList = {};
						bookList.bookId = 0;
						let chapterList = [];
						let chapters = {};
						chapters.book = book;
						chapters.chapter = 1;
						chapters.id = book.substr(0,book.length - 1) + 1;
						chapters.verseData = verseData;
						chapterList.push(chapters);
						bookList.chapters = chapterList;
						verseDetails.push(bookList);
						data.verses = verseDetails;
						parallel_done();
					}
				);

			});
		},
		function (parallel_done) {
			let query1 = "select distinct " + fieldConstant.Id + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + 1 + " and " + fieldConstant.Chapter + " = " + 1 + " and " + fieldConstant.VerseCount + " = " + 1;
			db.query(query1, {}, function (err, results) {
				if (err) return parallel_done(err);
				var stringFormat = JSON.stringify(results);
				console.log(stringFormat);
				var nextBook = {};
				async.forEach(results, function (tempValue, callBack) {
					let tempId = tempValue.Id + 1;
					if (tempId !== 0) {
						let getBookQuery = "select " + fieldConstant.Book + ", " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Id + " = " + tempId;
						db.query(getBookQuery, {}, function (error, bookResult) {
							if (error) return parallel_done(error);
							if (bookResult.length !== 0) {
								nextBook.book = bookResult[0].Book;
								nextBook.chapter = bookResult[0].Chapter;
							}
							callBack(null);
						})
					}
					else callBack(null);
				}, function () {
					data.nextBook = nextBook;
					console.log(nextBook);
					parallel_done();
				});

			});
		},
		function (parallel_done) {
			let query1 = "select distinct " + fieldConstant.Id + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + -1 + " and " + fieldConstant.Chapter + " = " + 1 + " and " + fieldConstant.VerseCount + " = " + 1;
			db.query(query1, {}, function (err, results) {
				if (err) return parallel_done(err);
				var stringFormat = JSON.stringify(results);
				console.log(stringFormat);
				var prevBook = {};
				async.forEach(results, function (tempValue, callBack) {
					let tempId = tempValue.Id;
					if (tempId !== 0) {
						let getBookQuery = "select " + fieldConstant.Book + ", " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Id + " = " + tempId;
						db.query(getBookQuery, {}, function (error, bookResult) {
							if (error) return parallel_done(error);
							if (bookResult.length !== 0) {
								prevBook.book = bookResult[0].Book;
								prevBook.chapter = bookResult[0].Chapter + 1;
							}
							callBack(null);
						})
					}
					else callBack(null);
				}, function () {
					data.prevBook = prevBook;
					console.log(prevBook);
					parallel_done();
				});

			});
		},
		function (parallel_done) {
			let query1 = "select " + fieldConstant.english + ", "+ langColumn +" from " + fieldConstant.books + " where " + fieldConstant.Id + " = " + 0;
			console.log('Query 6', query1);
			db.query(query1, {}, function (err, results) {
				if (err) return parallel_done(err);
				var stringFormat = JSON.stringify(results);
				var jsonStruct = JSON.parse(stringFormat);
				console.log('book value',jsonStruct);
				const currentPage = {};
				currentPage.chapter = 1
				currentPage.user = jsonStruct[0].english
				if (langReceived === 'ta') {
					currentPage.book = jsonStruct[0].tamil;
				}
				else {
					currentPage.book = jsonStruct[0].english;
				}
				data.currentPage = currentPage;
				console.log(data)
				parallel_done();

			});
		},

	], function (err) {
		if (err)
			console.log('error')
		// db.end();
		res.status(200).json({ success: true, data });
	});
});


router.post('/getChapterAndDetails', function (req, res, next) {
	const url = require('url');
	const url_parts = url.parse(req.url, true);
	const limit = url_parts.query.limit;
	const bookId = req.body.book;
	const chapter = req.body.chapter;

	const db = req.con;
	const langReceived = url_parts.query.lang;
	let langColumn = '';
	if (langReceived === 'ta') {
		langColumn = fieldConstant.tamil;
	}
	else {
		langColumn = fieldConstant.english;
	}
	// var query1 = "SELECT "+ fieldConstant.english + " FROM "+ fieldConstant.chapters;
	// if (bookId === 0)
	{
		var data = {};
		async.parallel([
			function (parallel_done) {
				let query2 = "select distinct " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId;
				db.query(query2, {}, function (err, results) {
					if (err) return parallel_done(err);
					var chapList = [];
					var chapObj = {};
					chapObj.book = bookId;
					chapObj.bookId = 'Boo' + bookId;
					chapObj.chapters = results.map(res =>{
						let chapterDetails = {}
						chapterDetails.id = 'Cha'+res.Chapter
						chapterDetails.Chapter = res.Chapter
						return chapterDetails
					})
					chapList.push(chapObj);
					data.chapters = chapList;
					parallel_done();
				});
			},
			function (parallel_done) {
				let query3 = "select " + fieldConstant.VerseCount + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = 1";
				db.query(query3, {}, function (err, results) {
					if (err) return parallel_done(err);
					var verseList = [];
					var verseNoObj = {};
					verseNoObj.chapter = 1;
					verseNoObj.id = 'Cha' + 1;
					verseNoObj.verse =  results.map(res => {
						let verseCountDetails = {}
						verseCountDetails.id = 'Cha'+ 1 +res.VerseCount
						verseCountDetails.key = 'Ver'+res.VerseCount
						verseCountDetails.VerseCount = res.VerseCount
						return verseCountDetails
					})
					verseList.push(verseNoObj);
					data.versecounts = verseList;
					// data.versecounts = results;
					parallel_done();
				});
			},
			function (parallel_done) {
				// let query4 = "select " + fieldConstant.Verse + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " limit " + limit;
				var query4 = "select " + fieldConstant.VerseCount + " , " + fieldConstant.Verse +" from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = 1";

				return db.query(query4, {}, function (err, results, fields) {
					if (err) return (err);
					var stringFormat = JSON.stringify(results);
					var verseObj = JSON.parse(stringFormat);
					//
					var listCount = 0;

					var verseDetails = [];
					let verseData = [];
					async.forEach(results, function (verse, callBack) {
							var stringFormat = JSON.stringify(verse);
							var verseCountObj = JSON.parse(stringFormat);
							var sql = "select " + fieldConstant.Verse + " from " + fieldConstant.bible_ + langReceived + " where Versecount = " + verseCountObj.VerseCount + " and " + fieldConstant.Chapter + " = 1 and " + fieldConstant.Book + " = " + bookId;
							let verseList = {};
							// verseList.book = 0;
							// verseList.chapter = 1;
							verseList.id = 'Ver'+verseCountObj.VerseCount;
							verseList.verseCount = verseCountObj.VerseCount;
							verseList.verse = verseCountObj.Verse;
							// bookList.verse(verseList);
							verseData.push(verseList);
							callBack(null);
							// data.sql =  sql;
							// db.query(sql, {}, function (err, result, next) {
							// 	if (err) return (err);
							// 	var stringFormat = JSON.stringify(result);
							// 	var verseObj = JSON.parse(stringFormat);
							//
							// 	listCount++;
							// 	let verseList = {};
							// 	// verseList.book = 0;
							// 	// verseList.chapter = 1;
							// 	verseList.verseCount = verseCountObj.VerseCount;
							// 	verseList.verse = result[0].Verse;
							// 	// bookList.verse(verseList);
							// 	verseData.push(verseList);
							// 	callBack(null);
							// });

							// resolve(data);
						}, function (datas) {
							var langColumn = '';
							if (langReceived === 'ta') {
								langColumn = fieldConstant.tamil;
							}
							else {
								langColumn = fieldConstant.english;
							}
							var query4 = "select " + langColumn + " from " + fieldConstant.books + " where " + fieldConstant.id + " = " + bookId;

							db.query(query4, {}, function (err, result, next) {
								if (err) return (err);
								var book = "";
								var stringFormat = JSON.stringify(result);
								var verseCountObj = JSON.parse(stringFormat);
								if (langReceived === 'ta') {
									book = verseCountObj[0].tamil;
								}
								else {
									book = verseCountObj[0].english;
								}
								var bookList = {};
								bookList.bookId = bookId;
								let chapterList = [];
								let chapters = {};
								chapters.book = book;
								chapters.chapter = 1;
								chapters.id = book.substr(0,book.length - 1) + 1;
								chapters.verseData = verseData;
								chapterList.push(chapters);
								bookList.chapters = chapterList;
								verseDetails.push(bookList);
								data.verses = verseDetails;
								parallel_done();
							});

						}
					);

				});
			},
			function (parallel_done) {
				let query1 = "select distinct " + fieldConstant.Id + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = " + chapter + " and " + fieldConstant.VerseCount + " = " + 1;
				console.log('Query 5', query1)
				db.query(query1, {}, function (err, results) {
					if (err) return parallel_done(err);
					var stringFormat = JSON.stringify(results);
					// console.log(stringFormat);
					var prevBook = {};
					async.forEach(results, function (tempValue, callBack) {
						let tempId = tempValue.Id - 1;
						console.log('id ', tempValue.Id)
						if (tempId !== 0) {
							let getBookQuery = "select " + fieldConstant.Book + ", " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Id + " = " + tempId;
							console.log('Query 2', getBookQuery)
							db.query(getBookQuery, {}, function (error, bookResult) {
								if (error) return parallel_done(error);
								if (bookResult.length !== 0) {
									prevBook.book = bookResult[0].Book;
									prevBook.chapter = bookResult[0].Chapter;
								}
								callBack(null);
							})
						}
						else callBack(null);
					}, function () {
						data.prevBook = prevBook;
						// console.log(prevBook);
						parallel_done();
					});

				});
			},
			function (parallel_done) {
				let query1 = "select distinct " + fieldConstant.Id + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = " + chapter +" ORDER BY ID DESC LIMIT 1";
				console.log('Query 3', query1);
				db.query(query1, {}, function (err, results) {
					if (err) return parallel_done(err);
					var stringFormat = JSON.stringify(results);
					// console.log(stringFormat);
					var nextBook = {};
					async.forEach(results, function (tempValue, callBack) {
						let tempId = tempValue.Id + 1;
						// console.log(tempId)
						if (tempId !== 0) {
							let getBookQuery = "select " + fieldConstant.Book + ", " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Id + " = " + tempId;
							console.log('Query 4',getBookQuery)
							db.query(getBookQuery, {}, function (error, bookResult) {
								if (error) return parallel_done(error);
								if (bookResult.length !== 0) {
									// console.log('bookres',bookResult)
									nextBook.book = bookResult[0].Book;
									nextBook.chapter = bookResult[0].Chapter;
								}
								callBack(null);
							})
						}
						else callBack(null);
					}, function () {
						data.nextBook = nextBook;
						// console.log(nextBook);
						parallel_done();
					});

				});
			},
			function (parallel_done) {
				let query1 = "select " + fieldConstant.english + ", "+ langColumn +" from " + fieldConstant.books + " where " + fieldConstant.Id + " = " + bookId;
				console.log('Query 6', query1);
				db.query(query1, {}, function (err, results) {
					if (err) return parallel_done(err);
					var stringFormat = JSON.stringify(results);
					var jsonStruct = JSON.parse(stringFormat);
					console.log('book value',jsonStruct);
					const currentPage = {};
					currentPage.chapter = chapter
					currentPage.user = jsonStruct[0].english
					if (langReceived === 'ta') {
						currentPage.book = jsonStruct[0].tamil;
					}
					else {
						currentPage.book = jsonStruct[0].english;
					}
					data.currentPage = currentPage;
					console.log(data)
					parallel_done();

				});
			},

		], function (err) {
			if (err)
				res.status(400).json({ success: false, data });
			// db.end();
			res.status(200).json({ success: true, data });
		});
	}
	//  else {
	// 	let prevBookId = bookId - 1;
	// 	let preChap = "select distinct " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " = " + prevBookId;
	// 	let curChap = "select distinct " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " = " + bookId;
	// 	let preVers = "select distinct " + fieldConstant.VerseCount + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " = " + prevBookId + " and " + fieldConstant.Chapter + " = 1";
	// 	let curVers = "select distinct " + fieldConstant.VerseCount + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " between " + prevBookId + " and " + bookId;
	// 	let query4 = "select " + fieldConstant.Verse + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " between " + prevBookId + " and " + bookId + " limit " + limit + "";
	// }
});

router.post('/getVerseAndDetails', function (req, res, next) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var limit = url_parts.query.limit;
	// var lang = url_parts.query.lang;
	var bookId = req.body.book;
	var chapter = req.body.chapter;
	var langReceived = url_parts.query.lang;
	let langColumn = '';
	if (langReceived === 'ta') {
		langColumn = fieldConstant.tamil;
	}
	else {
		langColumn = fieldConstant.english;
	}

	var db = req.con;

	// var query4 = "SELECT " + fieldConstant.Verse + " FROM " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " LIMIT " + limit + "";

	var data = {};
	async.parallel([
		function (parallel_done) {
			var query3 = "SELECT " + fieldConstant.VerseCount + " FROM " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = " + chapter;
			db.query(query3, {}, function (err, results) {
				if (err) return parallel_done(err);
				var verseList = [];
				var verseNoObj = {};
				verseNoObj.chapter = chapter;
				verseNoObj.id = 'Cha' + chapter;
				verseNoObj.verse =  results.map(res => {
					let verseCountDetails = {}
					verseCountDetails.id = 'Cha'+ chapter +res.VerseCount
					verseCountDetails.key = 'Ver'+res.VerseCount
					verseCountDetails.VerseCount = res.VerseCount
					return verseCountDetails
				})
				verseList.push(verseNoObj);
				data.versecounts = verseList;
				// data.versecounts = results;
				parallel_done();
			});
		},
		function (parallel_done) {
			let query4 = "select " + fieldConstant.VerseCount + " , " + fieldConstant.Verse +" from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = " + chapter;

			return db.query(query4, {}, function (err, results, fields) {
				if (err) return (err);
				var stringFormat = JSON.stringify(results);
				var verseObj = JSON.parse(stringFormat);
				//
				var listCount = 0;

				var verseDetails = [];
				let verseData = [];
				async.forEach(results, function (verse, callBack) {
						var stringFormat = JSON.stringify(verse);
						var verseCountObj = JSON.parse(stringFormat);
						var sql = "select " + fieldConstant.Verse + " from " + fieldConstant.bible_ + langReceived + " where Versecount = " + verseCountObj.VerseCount + " and " + fieldConstant.Chapter + " = " + chapter + " and " + fieldConstant.Book + " = " + bookId;
						let verseList = {};
						// verseList.book = 0;
						// verseList.chapter = 1;
						verseList.id = 'Ver'+verseCountObj.VerseCount;
						verseList.verseCount = verseCountObj.VerseCount;
						verseList.verse = verseCountObj.Verse;
						// bookList.verse(verseList);
						verseData.push(verseList);
						callBack(null);
						// data.sql =  sql;
						// db.query(sql, {}, function (err, result, next) {
						// 	if (err) return (err);
						// 	var stringFormat = JSON.stringify(result);
						// 	var verseObj = JSON.parse(stringFormat);
						//
						//
						//
						// 	listCount++;
						// 	let verseList = {};
						// 	// verseList.book = 0;
						// 	// verseList.chapter = 1;
						// 	verseList.verseCount = verseCountObj.VerseCount;
						// 	verseList.verse = result[0].Verse;
						// 	// bookList.verse(verseList);
						// 	verseData.push(verseList);
						// 	callBack(null);
						// });

						// resolve(data);
					}, function (datas) {

						var langColumn = '';
						if (langReceived === 'ta') {
							langColumn = fieldConstant.tamil;
						}
						else {
							langColumn = fieldConstant.english;
						}
						var query4 = "select " + langColumn + " from " + fieldConstant.books + " where " + fieldConstant.id + " = " + bookId;

						db.query(query4, {}, function (err, result, next) {
							if (err) return (err);
							var book = "";
							var stringFormat = JSON.stringify(result);
							var verseCountObj = JSON.parse(stringFormat);
							if (langReceived === 'ta') {
								book = verseCountObj[0].tamil;
							}
							else {
								book = verseCountObj[0].english;
							}
							var bookList = {};
							bookList.bookId = bookId;
							let chapterList = [];
							let chapters = {};
							chapters.book = book;
							chapters.chapter = chapter;
							chapters.id = book.substr(0,book.length - 1) + 1;
							chapters.verseData = verseData;
							chapterList.push(chapters);
							bookList.chapters = chapterList;
							verseDetails.push(bookList);
							data.verses = verseDetails;
							parallel_done();
						});

					}
				);

			});
		},
		function (parallel_done) {
			let query1 = "select distinct " + fieldConstant.Id + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = " + chapter + " and " + fieldConstant.VerseCount + " = " + 1;
			console.log('Query 5', query1)
			db.query(query1, {}, function (err, results) {
				if (err) return parallel_done(err);
				var stringFormat = JSON.stringify(results);
				// console.log(stringFormat);
				var prevBook = {};
				async.forEach(results, function (tempValue, callBack) {
					let tempId = tempValue.Id - 1;
					console.log('id ', tempValue.Id)
					if (tempId !== 0) {
						let getBookQuery = "select " + fieldConstant.Book + ", " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Id + " = " + tempId;
						console.log('Query 2', getBookQuery)
						db.query(getBookQuery, {}, function (error, bookResult) {
							if (error) return parallel_done(error);
							if (bookResult.length !== 0) {
								prevBook.book = bookResult[0].Book;
								prevBook.chapter = bookResult[0].Chapter;
							}
							callBack(null);
						})
					}
					else callBack(null);
				}, function () {
					data.prevBook = prevBook;
					// console.log(prevBook);
					parallel_done();
				});

			});
		},
		function (parallel_done) {
			let query1 = "select distinct " + fieldConstant.Id + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = " + chapter +" ORDER BY ID DESC LIMIT 1";
			console.log('Query 3', query1);
			db.query(query1, {}, function (err, results) {
				if (err) return parallel_done(err);
				var stringFormat = JSON.stringify(results);
				// console.log(stringFormat);
				var nextBook = {};
				async.forEach(results, function (tempValue, callBack) {
					let tempId = tempValue.Id + 1;
					// console.log(tempId)
					if (tempId !== 0) {
						let getBookQuery = "select " + fieldConstant.Book + ", " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Id + " = " + tempId;
						console.log('Query 4',getBookQuery)
						db.query(getBookQuery, {}, function (error, bookResult) {
							if (error) return parallel_done(error);
							if (bookResult.length !== 0) {
								// console.log('bookres',bookResult)
								nextBook.book = bookResult[0].Book;
								nextBook.chapter = bookResult[0].Chapter;
							}
							callBack(null);
						})
					}
					else callBack(null);
				}, function () {
					data.nextBook = nextBook;
					// console.log(nextBook);
					parallel_done();
				});

			});
		},
		function (parallel_done) {
			let query1 = "select " + fieldConstant.english + ", "+ langColumn +" from " + fieldConstant.books + " where " + fieldConstant.Id + " = " + bookId;
			console.log('Query 6', query1);
			db.query(query1, {}, function (err, results) {
				if (err) return parallel_done(err);
				var stringFormat = JSON.stringify(results);
				var jsonStruct = JSON.parse(stringFormat);
				console.log('book value',jsonStruct);
				const currentPage = {};
				currentPage.chapter = chapter
				currentPage.user = jsonStruct[0].english
				if (langReceived === 'ta') {
					currentPage.book = jsonStruct[0].tamil;
				}
				else {
					currentPage.book = jsonStruct[0].english;
				}
				data.currentPage = currentPage;
				console.log(data)
				parallel_done();

			});
		},
	], function (err) {
		if (err)
			res.status(400).json({ success: false });
		// db.end();
		res.status(200).json({ success: true, data });
	});
});

router.post('/getDetails', function (req, res, next) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var limit = url_parts.query.limit;
	var bookId = req.body.book;
	var chapter = req.body.chapter;
	var verse = req.body.verse
	var langReceived = url_parts.query.lang;
	let langColumn = '';
	if (langReceived === 'ta') {
		langColumn = fieldConstant.tamil;
	}
	else {
		langColumn = fieldConstant.english;
	}

	var db = req.con;
	// var query4 = "SELECT " + fieldConstant.Verse + " FROM " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " LIMIT " + limit + "";

	var data = {};
	async.parallel([
		function (parallel_done) {
			var query4 = "select " + fieldConstant.VerseCount + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = " + chapter;

			return db.query(query4, {}, function (err, results, fields) {
				if (err) return (err);
				var stringFormat = JSON.stringify(results);
				var verseObj = JSON.parse(stringFormat);
				//
				var listCount = 0;

				var verseDetails = [];
				let verseData = [];
				async.forEach(results, function (verse, callBack) {
						var stringFormat = JSON.stringify(verse);
						var verseCountObj = JSON.parse(stringFormat);
						var sql = "select " + fieldConstant.Verse + " from " + fieldConstant.bible_ + langReceived + " where Versecount = " + verseCountObj.VerseCount + " and " + fieldConstant.Chapter + " = " + chapter + " and " + fieldConstant.Book + " = " + bookId;
						//

						// data.sql =  sql;
						db.query(sql, {}, function (err, result, next) {
							if (err) return (err);
							var stringFormat = JSON.stringify(result);
							var verseObj = JSON.parse(stringFormat);



							listCount++;
							let verseList = {};
							// verseList.book = 0;
							// verseList.chapter = 1;
							verseList.verseCount = verseCountObj.VerseCount;
							verseList.verse = result[0].Verse;
							// bookList.verse(verseList);
							verseData.push(verseList);
							callBack(null);
						});

						// resolve(data);
					}, function (datas) {


						var query4 = "select " + langColumn + " from " + fieldConstant.books + " where " + fieldConstant.id + " = " + bookId;

						db.query(query4, {}, function (err, result, next) {
							if (err) return (err);
							var book = "";
							var stringFormat = JSON.stringify(result);
							var verseCountObj = JSON.parse(stringFormat);
							if (langReceived === 'ta') {
								book = verseCountObj[0].tamil;
							}
							else {
								book = verseCountObj[0].english;
							}
							var bookList = {};
							bookList.bookId = bookId;
							let chapterList = [];
							let chapters = {};
							chapters.book = book;
							chapters.chapter = chapter;
							chapters.verseData = verseData;
							chapterList.push(chapters);
							bookList.chapters = chapterList;
							verseDetails.push(bookList);
							data.verses = verseDetails;
							parallel_done();
						});

					}
				);

			});
		},
		// function (parallel_done) {
		// 	let query1 = "select distinct " + fieldConstant.Id + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = " + chapter + " and " + fieldConstant.VerseCount + " = " + 1;
		// 	console.log('Query 5', query1)
		// 	db.query(query1, {}, function (err, results) {
		// 		if (err) return parallel_done(err);
		// 		var stringFormat = JSON.stringify(results);
		// 		// console.log(stringFormat);
		// 		var prevBook = {};
		// 		async.forEach(results, function (tempValue, callBack) {
		// 			let tempId = tempValue.Id - 1;
		// 			console.log('id ', tempValue.Id)
		// 			if (tempId !== 0) {
		// 				let getBookQuery = "select " + fieldConstant.Book + ", " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Id + " = " + tempId;
		// 				console.log('Query 2', getBookQuery)
		// 				db.query(getBookQuery, {}, function (error, bookResult) {
		// 					if (error) return parallel_done(error);
		// 					if (bookResult.length !== 0) {
		// 						prevBook.book = bookResult[0].Book;
		// 						prevBook.chapter = bookResult[0].Chapter;
		// 					}
		// 					callBack(null);
		// 				})
		// 			}
		// 			else callBack(null);
		// 		}, function () {
		// 			data.prevBook = prevBook;
		// 			// console.log(prevBook);
		// 			parallel_done();
		// 		});
		//
		// 	});
		// },
		// function (parallel_done) {
		// 	let query1 = "select distinct " + fieldConstant.Id + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = " + chapter +" ORDER BY ID DESC LIMIT 1";
		// 	console.log('Query 3', query1);
		// 	db.query(query1, {}, function (err, results) {
		// 		if (err) return parallel_done(err);
		// 		var stringFormat = JSON.stringify(results);
		// 		// console.log(stringFormat);
		// 		var nextBook = {};
		// 		async.forEach(results, function (tempValue, callBack) {
		// 			let tempId = tempValue.Id + 1;
		// 			// console.log(tempId)
		// 			if (tempId !== 0) {
		// 				let getBookQuery = "select " + fieldConstant.Book + ", " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Id + " = " + tempId;
		// 				console.log('Query 4',getBookQuery)
		// 				db.query(getBookQuery, {}, function (error, bookResult) {
		// 					if (error) return parallel_done(error);
		// 					if (bookResult.length !== 0) {
		// 						// console.log('bookres',bookResult)
		// 						nextBook.book = bookResult[0].Book;
		// 						nextBook.chapter = bookResult[0].Chapter;
		// 					}
		// 					callBack(null);
		// 				})
		// 			}
		// 			else callBack(null);
		// 		}, function () {
		// 			data.nextBook = nextBook;
		// 			// console.log(nextBook);
		// 			parallel_done();
		// 		});
		//
		// 	});
		// },
		// function (parallel_done) {
		// 	let query1 = "select " + fieldConstant.english + ", "+ langColumn +" from " + fieldConstant.books + " where " + fieldConstant.Id + " = " + bookId;
		// 	console.log('Query 6', query1);
		// 	db.query(query1, {}, function (err, results) {
		// 		if (err) return parallel_done(err);
		// 		var stringFormat = JSON.stringify(results);
		// 		var jsonStruct = JSON.parse(stringFormat);
		// 		console.log('book value',jsonStruct);
		// 		const currentPage = {};
		// 		currentPage.chapter = chapter
		// 		currentPage.user = jsonStruct[0].english
		// 		if (langReceived === 'ta') {
		// 			currentPage.book = jsonStruct[0].tamil;
		// 		}
		// 		else {
		// 			currentPage.book = jsonStruct[0].english;
		// 		}
		// 		data.currentPage = currentPage;
		// 		console.log(data)
		// 		parallel_done();
		//
		// 	});
		// },
		// function (parallel_done) {
		// 	db.query(query4, {}, function (err, results) {
		// 		if (err) return parallel_done(err);
		// 		data.verses = results;
		// 		parallel_done();
		// 	});
		// }

	], function (err) {
		if (err)
			// db.end();
			res.status(200).json({ success: true, data });
	});
});

router.post('/getDynamicDetails', function (req, res, next) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var limit = url_parts.query.limit;
	var bookId = req.body.book;
	var chapterId = req.body.chapter;
	var verseId = req.body.verse;

	var db = req.con;
	var langReceived = url_parts.query.lang;
	var data = {};
	async.parallel([
		function (parallel_done) {
			let query1 = "select distinct " + fieldConstant.Id + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = " + chapterId + " and " + fieldConstant.VerseCount + " = " + verseId;
			db.query(query1, {}, function (err, results) {
				if (err) return parallel_done(err);
				var stringFormat = JSON.stringify(results);

				var prevBook = {};
				async.forEach(results, function (tempValue, callBack) {
					let tempId = tempValue.Id - 1;
					if (tempId !== 0) {
						let getBookQuery = "select " + fieldConstant.Book + ", " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Id + " = " + tempId;
						db.query(getBookQuery, {}, function (error, bookResult) {
							if (error) return parallel_done(error);
							if (bookResult.length !== 0) {
								prevBook.book = bookResult[0].Book;
								prevBook.chapter = bookResult[0].Chapter;
							}
							callBack(null);
						})
					}
					else callBack(null);
				}, function () {
					data.prevBook = prevBook;

					parallel_done();
				});

			});
		},
		function (parallel_done) {
			let query1 = "select distinct " + fieldConstant.Id + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = " + chapterId + " and " + fieldConstant.VerseCount + " = " + verseId;
			db.query(query1, {}, function (err, results) {
				if (err) return parallel_done(err);
				var stringFormat = JSON.stringify(results);

				var nextBook = {};
				async.forEach(results, function (tempValue, callBack) {
					let tempId = tempValue.Id + 1;
					if (tempId !== 0) {
						let getBookQuery = "select " + fieldConstant.Book + ", " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Id + " = " + tempId;
						db.query(getBookQuery, {}, function (error, bookResult) {
							if (error) return parallel_done(error);
							if (bookResult.length !== 0) {
								nextBook.book = bookResult[0].Book;
								nextBook.chapter = bookResult[0].Chapter;

							}
							callBack(null);
						})
					}
					else callBack(null);
				}, function () {
					data.nextBook = nextBook;

					parallel_done();
				});

			});
		},
		function (parallel_done) {
			let query2 = "select distinct " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId;

			db.query(query2, {}, function (err, results) {
				if (err) return parallel_done(err);
				var chapList = [];
				var chapObj = {};
				chapObj.bookId = fieldConstant.bookId + bookId;
				chapObj.bookNo = bookId;
				chapObj.chapters = results
				chapList.push(chapObj);
				data.chapters = chapList;
				parallel_done();
			});
		},
		function (parallel_done) {
			let query3 = "select " + fieldConstant.VerseCount + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = " + chapterId;

			db.query(query3, {}, function (err, results) {
				if (err) return parallel_done(err);
				var verseList = [];
				var verseNoObj = {};
				verseNoObj.chapter = chapterId;
				verseNoObj.verseItems = results.map(res => {

					var verseCount = {};
					verseCount.verseId= fieldConstant.verseId + res.VerseCount;
					verseCount.verseNo =res.VerseCount;
					return verseCount;
				})
				verseList.push(verseNoObj);
				data.versecounts = verseList;
				// data.versecounts = results;
				parallel_done();
			});
		},
		function (parallel_done) {
			// let query4 = "select " + fieldConstant.Verse + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " limit " + limit;

			let query4 = "select " + fieldConstant.VerseCount + " from " + fieldConstant.bible_ + langReceived + " where " + fieldConstant.Book + " = " + bookId + " and " + fieldConstant.Chapter + " = " + chapterId;

			return db.query(query4, {}, function (err, results, fields) {
				if (err) return (err);
				var stringFormat = JSON.stringify(results);
				var verseObj = JSON.parse(stringFormat);
				//
				var listCount = 0;

				var verseDetails = [];
				let verseData = [];
				async.forEach(results, function (verse, callBack) {
						var stringFormat = JSON.stringify(verse);
						var verseCountObj = JSON.parse(stringFormat);
						var sql = "select " + fieldConstant.Verse + " from " + fieldConstant.bible_ + langReceived + " where Versecount = " + verseCountObj.VerseCount + " and " + fieldConstant.Chapter + " = "+chapterId +" and " + fieldConstant.Book + " = " + bookId;

						// data.sql =  sql;
						db.query(sql, {}, function (err, result, next) {
							if (err) return (err);
							var stringFormat = JSON.stringify(result);
							var verseObj = JSON.parse(stringFormat);

							listCount++;
							let verseList = {};
							// verseList.book = 0;
							// verseList.chapter = 1;
							verseList.verseCount = verseCountObj.VerseCount;
							verseList.verse = result[0].Verse;
							// bookList.verse(verseList);
							verseData.push(verseList);
							callBack(null);
						});

						// resolve(data);
					}, function (datas) {

						var langColumn = '';
						if (langReceived === 'ta') {
							langColumn = fieldConstant.tamil;
						}
						else {
							langColumn = fieldConstant.english;
						}
						var query5 = "select " + langColumn + " from " + fieldConstant.books + " where " + fieldConstant.id + " = " + bookId;

						db.query(query5, {}, function (err, result, next) {
							if (err) return (err);
							var book = "";
							var stringFormat = JSON.stringify(result);
							var verseCountObj = JSON.parse(stringFormat);
							if (langReceived === 'ta') {
								book = verseCountObj[0].tamil;
							}
							else {
								book = verseCountObj[0].english;
							}
							var bookList = {};
							bookList.bookId = bookId;
							let chapterList = [];
							let chapters = {};
							chapters.book = book;
							chapters.chapter = chapterId;
							chapters.verseData = verseData;
							chapterList.push(chapters);
							bookList.chapters = chapterList;
							verseDetails.push(bookList);
							data.verses = verseDetails;
							parallel_done();
						});

					}
				);

			});
		},

	], function (err) {
		if (err)
			// db.end();
			res.status(200).json({ success: true, data });
	});
	//  else {
	// 	let prevBookId = bookId - 1;
	// 	let preChap = "select distinct " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " = " + prevBookId;
	// 	let curChap = "select distinct " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " = " + bookId;
	// 	let preVers = "select distinct " + fieldConstant.VerseCount + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " = " + prevBookId + " and " + fieldConstant.Chapter + " = 1";
	// 	let curVers = "select distinct " + fieldConstant.VerseCount + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " between " + prevBookId + " and " + bookId;
	// 	let query4 = "select " + fieldConstant.Verse + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " between " + prevBookId + " and " + bookId + " limit " + limit + "";
	// }
});

/* GET home page. */
router.get('/apis', function (req, res, next) {
	res.send('Api Working');
});


async function start(req, res) {
	await change(req).then(query3 => {





		res.json(query3);
	});
}

function change(req) {
	var url = require('url');
	var db = req.con;
	var data = {};
	var url_parts = url.parse(req.url, true);
	var limit = url_parts.query.limit;
	var lang = url_parts.query.lang;
	return new Promise(function (resolve, reject) {
		var query3 = "select " + fieldConstant.VerseCount + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " = 0 and " + fieldConstant.Chapter + " = 1";
		// Setting 2000 ms time
		db.query(query3, {}, function (err, results, fields) {
			if (err) return (err);
			// var verseNoObj = {};
			// verseNoObj.chapter = 1;
			// verseNoObj.verse= results
			// data.versecounts = verseNoObj;

			// return (results);
			resolve(results);
		});
		// setTimeout(resolve, 0);
	});
}

const promise1 = (req) => new Promise((resolve, reject) => {

	var url = require('url');
	var db = req.con;
	var url_parts = url.parse(req.url, true);
	var limit = url_parts.query.limit;
	var lang = url_parts.query.lang;
	var query3 = "select " + fieldConstant.VerseCount + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " = 0 and " + fieldConstant.Chapter + " = 1";
	return db.query(query3, {}, function (err, results, fields) {
		if (err) return (err);
		// var verseNoObj = {};
		// verseNoObj.chapter = 1;
		// verseNoObj.verse= results
		// data.versecounts = verseNoObj;
		var stringFormat = JSON.stringify(results);
		var verseObj = JSON.parse(stringFormat);
		//
		var listCount = 0;

		var verseDetails = [];
		async.forEach(results, function (verse, callBack) {
				var stringFormat = JSON.stringify(verse);
				var verseCountObj = JSON.parse(stringFormat);
				var sql = "select Verse from bible_en where Versecount = " + verseCountObj.VerseCount + " and Chapter = 1 and Book = 0";

				// data.sql =  sql;
				db.query(sql, {}, function (err, result, next) {
					if (err) return (err);
					var stringFormat = JSON.stringify(result);
					var verseObj = JSON.parse(stringFormat);

					listCount++;
					let verses = {};
					verses.verseCount = verseCountObj.VerseCount;
					verses.verse = result[0].Verse;
					verseDetails.push(verses);
					//
					// if(listCount == results.length){
					// 	resolve(results);
					//   }

					callBack(null);
				});

				// resolve(data);
			}, function (datas) {

				resolve(verseDetails);
			}
		);
	});
});


module.exports = router;


// db.query(query3, {}, function (err, results) {
// 			if (err) return parallel_done(err);
// 			var verseNoObj = {};
// 			verseNoObj.chapter = 1;
// 			verseNoObj.verse= results
// 			data.versecounts = verseNoObj;

// 			async.forEach(results, function(verse, callBack)
// 	{
// 		var stringFormat=JSON.stringify(verse);
// 		var verseCountObj =  JSON.parse(stringFormat);
// 			var sql = "select Verse from bible_en where Versecount = "+verseCountObj.VerseCount;
//
// 			// data.sql =  sql;
// 			db.query(sql, {}, function (err, result, next) {
// 				if (err) return (err);
// 				var verses = {};
// 				verses.verseCount = verseCountObj.VerseCount;
// 				verse.verse = result;
// 				data.verseList = verses;
//
//
// 				// if(listCount == results.length){
// 				// 	resolve(results);
// 				//   }

// 				callBack();
// 			});

// 			// resolve(data);
// 	}
// 	, function(datas)
// 	{
// 		parallel_done();
// 	}
// 	);
// });
// async.parallel([
// 	function(callBack)
// 	{
// 		results.map(verse => {
// 			var stringFormat=JSON.stringify(verse);
// 			var verseCountObj =  JSON.parse(stringFormat);
// 				var sql = "select Verse from bible_en where Versecount = "+verseCountObj.VerseCount;
//
// 				db.query(sql, {}, function (err, results) {
// 					if (err) return parallel_done(err);
// 					//
//
// 					var verses = {};
// 					verses.verseCount = verseCountObj.VerseCount;
// 					verse.verse = results;
// 					data.verseList = verses;

// 				});
// 			}

// 			);
// 			callBack();
// 	}
// ]);

// async.timesSeries(results, function (verse, next) {
// 	//
// 	// data.verseList = verse;
// 	var stringFormat=JSON.stringify(verse);
// 	var verseCountObj =  JSON.parse(stringFormat);
// 		var sql = "select Verse from bible_en where Versecount = "+verseCountObj.VerseCount;
//
// 		db.query(sql, {}, function (err, results) {
// 			if (err) return parallel_done(err);
// 			//
//
// 			var verses = {};
// 			verses.verseCount = verseCountObj.VerseCount;
// 			verse.verse = results;
// 			data.verseList = verses;
// 		});
// 	next();
// });

// results.map(verse => {
// 	var stringFormat=JSON.stringify(verse);
// 	var verseCountObj =  JSON.parse(stringFormat);
// 		var sql = "select Verse from bible_en where Versecount = "+verseCountObj.VerseCount;
//
// 		data.sql =  sql;
// 		db.query(sql, {}, function (err, results, next) {
// 			if (err) return parallel_done(err);
// 			//
//
// 			var verses = {};
// 			verses.verseCount = verseCountObj.VerseCount;
// 			verse.verse = results;
// 			data.verseList = verses;

// 		});
// 	}

// 	);
// parallel_done(null, verseNoObj.verse);
// });

// function (result, parallel_done) {
//

// result.map(verse => {
// 		var stringFormat=JSON.stringify(verse);
// 		var verseCountObj =  JSON.parse(stringFormat);
// 			var sql = "select Verse from bible_en where Versecount = "+verseCountObj.VerseCount;
//
// 			data.sql =  sql;
// 			db.query(sql, {}, function (err, results, next) {
// 				if (err) return next(err);
// 				//
//
// 				var verses = {};
// 				verses.verseCount = verseCountObj.VerseCount;
// 				verse.verse = results;
// 				data.verseList = verses;
// 				next();
// 			});
// 		}

// 		);

// async.forEach(result, function (verse, next) {
// 	//
// 	// data.verseList = verse;
// 	var stringFormat = JSON.stringify(verse);
// 	var verseCountObj = JSON.parse(stringFormat);
// 	var sql = "select Verse from bible_en where Versecount = " + verseCountObj.VerseCount;
//
// 	data.sql = sql;

// 	db.query(sql, function (err, results, t) {
// 		if (err) return parallel_done(err);
// 		//
//
// 		var verses = {};
// 		verses.verseCount = verseCountObj.VerseCount;
// 		verse.verse = results;
// 		data.verseList = verses;

// 	});

// 	next();
// });
// parallel_done();
// db.query(query3, {}, function (err, results) {
// 	if (err) return parallel_done(err);
// 	results.map(
// 		chapter => {
// 			db.query("Select "+fieldConstant.Verse+" from "+fieldConstant.bible_+lang+" where book = 0 and "+fieldConstant.Chapter +" = "+chapter,{}, function (err, result){
// 			if (err) return parallel_done(err);
//
// 		})
//
// 	});

// 	// var verseObj = {};
// 	// verseObj.verseNo = 1;
// 	// verseObj.verses= results
// 	// data.verses = verseObj;
// 	parallel_done();
// });

// db.query(query4, {}, function (err, results) {
// 	if (err) return parallel_done(err);
// 	//
// 	var verseObj = {};
// 	verseObj.verseNo = 1;
// 	verseObj.verses= results
// 	data.verses = verseObj;
// 	parallel_done();
// });
// }


// router.get('/getFullDetails', function(req, res, next)
// {
// 	var url = require('url');
// 	var url_parts = url.parse(req.url, true);
// 	var limit = url_parts.query.limit;
// 	var lang = url_parts.query.lang;
// 	var db = req.con;
// 	var query1 = "select " + fieldConstant.english + " from " + fieldConstant.books;
// 	var query2 = "select distinct " + fieldConstant.Chapter + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " = 0";
// 	var query3 = "select " + fieldConstant.VerseCount + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " = 0 and " + fieldConstant.Chapter + " = 1";
// 	var query4 = "select " + fieldConstant.Verse + " from " + fieldConstant.bible_ + lang + " where " + fieldConstant.Book + " = 0 LIMIT " + limit + "";

// 	var data = {};
// 	db.query(query1, {}, function (err, results) {
// 		if (err) return null;
// 		var result = results.map(function (chap) {
// 			var chapObj = {};
// 			chapObj.user = chap.english;
// 			chapObj.human = chap.english;
// 			chapObj.id = chap.id;
// 			return chapObj;
// 		})
// 		data.books = result;
// 	});

// 	db.query(query2, {}, function (err, results) {
// 		if (err) return null;
// 		var chapObj = {};
// 		chapObj.bookId = 0;
// 		chapObj.chapters= results
// 		data.chapters = chapObj;
// 	});

// })

// var func = async function(parallel_done)
// {
// 	var query1 = "select " + fieldConstant.english + " from " + fieldConstant.books;
// 	db.query(query1, {}, function (err, results) {
// 				if (err) return parallel_done(err);
// 				var result = results.map(function (chap) {
// 					var chapObj = {};
// 					chapObj.user = chap.english;
// 					chapObj.human = chap.english;
// 					chapObj.id = chap.id;
// 					return chapObj;
// 				})
// 				data.books = result;
// 				parallel_done();
// 			});
// }