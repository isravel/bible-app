// import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import home from './HomeScreen.module.css';
import NavScreen from './NavScreen';
import BookList from './BookListScreen';
import ChapterList from './ChaperListScreen';
import VerseList from './VerseListScreen';
import ChapterScreen from './ChapterScreen';

import React from "react";
import initSqlJs from "sql.js";
import fs from 'fs'
// import initSqlJs from "sql.js";
// import fs from "fs";
// var fs = require('fs');
// var initSqlJs = require('sql-wasm.js');

var filebuffer = fs.readFileSync('test.sqlite');
// import AppDao from '../dao/dao';
// const AppDao = require('../dao/dao');

// class HomeScreen extends React.Component {

// 	constructor(props)
// 	{
// 		super(props);
// 		this.state = { db: null, err: null, results: null }
// 	}

// 	componentDidMount() {
// 		// sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
// 		// without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
// 		// see ../config-overrides.js
// 		initSqlJs()
// 		  .then(SQL => this.setState({ db: new SQL.Database('') }))
// 		  .catch(err => this.setState({ err }));
// 	  }

// 	render() {
// 		return (<div className="application fixed-layout">
// 			<NavScreen/>
// 			<main class="verse-viewport">

// 				<aside class="sidebar left">
// 					<div class="books_list">
// 						<div class="list_title">Books</div>
// 						<BookList/>
// 					</div>

// 					<div class="chapters_list">
// 						<div class="list_title">Chapter</div>
// 						<ChapterList/>
// 					</div>

// 					<div class="verse_list">
// 						<div class="list_title">Verse</div>
// 						<VerseList/>
// 					</div>
// 				</aside>

// 				<article class="bible__chapters">
// 					<div class="container">
// 						<ChapterScreen/>
// 					</div>
// 				</article>

// 				<aside class="sidebar right"></aside>
// 			</main>

// 			<footer></footer>

// 		</div>);
// 	}
// }
// import React from 'react';
// import logo from '../logo.svg';
// import '../App.css';
// import home from './HomeScreen.module.css';
// import NavScreen from './NavScreen';
// import BookList from './BookListScreen';
// import ChapterList from './ChaperListScreen';
// import VerseList from './VerseListScreen';
// import ChapterScreen from './ChapterScreen';
//
// class HomeScreen extends React.Component {
// 	render() {
// 		return (<div className="application fixed-layout">
// 			<NavScreen/>
// 			<main class="verse-viewport">
//
// 				<aside class="sidebar left">
// 					<div class="books_list">
// 						<div class="list_title">Books</div>
// 						<BookList/>
// 					</div>
//
// 					<div class="chapters_list">
// 						<div class="list_title">Chapter</div>
// 						<ChapterList/>
// 					</div>
//
// 					<div class="verse_list">
// 						<div class="list_title">Verse</div>
// 						<VerseList/>
// 					</div>
// 				</aside>
//
// 				<article class="bible__chapters">
// 					<div class="container">
// 						<ChapterScreen/>
// 					</div>
// 				</article>
//
// 				<aside class="sidebar right"></aside>
// 			</main>
//
// 			<footer></footer>
//
// 		</div>);
// 	}
// }
//
// export default HomeScreen;










export default class App extends React.Component {

  constructor() {
    super();
    this.state = { db: null, err: null, results: null }
  }


  componentDidMount() {
    // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
    // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
    // see ../config-overrides.js
    initSqlJs()
      .then(SQL => this.setState({
				db: new SQL.Database()

			}))
      .catch(err => this.setState({ err }));
  }

  exec(sql) {
    let results = null, err = null;
    try {
      // The sql is executed synchronously on the UI thread.
      // You may want to use a web worker
      results = this.state.db.exec(sql); // an array of objects is returned
    } catch (e) {
      // exec throws an error when the SQL statement is invalid
      err = e
    }
    this.setState({ results, err })
  }

  /**
   * Renders a single value of the array returned by db.exec(...) as a table
   */
  renderResult({ columns, values }) {
    return (
      <table>
        <thead>
          <tr>
            {columns.map(columnName =>
              <td>{columnName}</td>
            )}
          </tr>
        </thead>

        <tbody>
          {values.map(row => // values is an array of arrays representing the results of the query
            <tr>
              {row.map(value =>
                <td>{value}</td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let { db, err, results } = this.state;
    if (!db) return <pre>Loading...</pre>;
    return (
      <div className="App">

        <h1>React SQL interpreter</h1>

        <textarea
          onChange={e => this.exec(e.target.value)}
          placeholder="Enter some SQL. No inpiration ? Try “select sqlite_version()”"
					
        ></textarea>

        <pre className="error">{(err || "").toString()}</pre>

        <pre>{results
          ? results.map(this.renderResult) // results contains one object per select statement in the query
          : ""
        }</pre>

      </div>
    );
  }

}
