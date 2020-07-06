import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import home from './HomeScreen.module.css';
import NavScreen from './NavScreen';
import BookList from './BookListScreen';
import ChapterList from './ChaperListScreen';
import VerseList from './VerseListScreen';
import ChapterScreen from './ChapterScreen';
import initSqlJs from "sql.js";
// import fs from "fs";
var fs = require('fs');
// var initSqlJs = require('sql-wasm.js');

var filebuffer = fs.readFileSync('test.sqlite');
// import AppDao from '../dao/dao';
// const AppDao = require('../dao/dao');

class HomeScreen extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = { db: null, err: null, results: null }
	}

	componentDidMount() {
		// sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
		// without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
		// see ../config-overrides.js
		initSqlJs()
		  .then(SQL => this.setState({ db: new SQL.Database('') }))
		  .catch(err => this.setState({ err }));
	  }

	render() {
		return (<div className="application fixed-layout">
			<NavScreen/>
			<main class="verse-viewport">

				<aside class="sidebar left">
					<div class="books_list">
						<div class="list_title">Books</div>
						<BookList/>
					</div>

					<div class="chapters_list">
						<div class="list_title">Chapter</div>
						<ChapterList/>
					</div>

					<div class="verse_list">
						<div class="list_title">Verse</div>
						<VerseList/>
					</div>
				</aside>

				<article class="bible__chapters">
					<div class="container">
						<ChapterScreen/>
					</div>
				</article>

				<aside class="sidebar right"></aside>
			</main>

			<footer></footer>

		</div>);
	}
}

export default HomeScreen;
