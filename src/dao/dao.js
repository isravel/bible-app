const sqlite3 = require('sqlite3')
const Promise = require('bluebird')

var fs = require('fs');
var initSqlJs = require('sql-wasm.js');
var filebuffer = fs.readFileSync('test.sqlite');

class AppDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })
  }

  

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
        this.db.all(`SELECT * from bible`, (err, row) => {
            if (err) {
              console.error(err.message);
            }
            console.log(row);
            resolve(row);
          });
      // this.db.get(sql, params, (err, result) => {
      //   if (err) {
      //     console.log('Error running sql: ' + sql)
      //     console.log(err)
      //     reject(err)
      //   } else {
            // console.log(result);
          // resolve(result)
        //   result.map(bible =>{
        //     console.log(bible);
        //   })
        // }
      // })
    })
  }
}

module.exports = AppDAO