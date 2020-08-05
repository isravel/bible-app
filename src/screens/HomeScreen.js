import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import home from './HomeScreen.module.css';
import NavScreen from './NavScreen';
import BookList from './BookListScreen';
import ChapterList from './ChaperListScreen';
import VerseList from './VerseListScreen';
import VerseScreen from './VerseScreens/VerseScreen';
import fieldConstants from '../utils/FieldConstants';

class HomeScreen extends React.Component {
	constructor(props) {
        super(props);
		fieldConstants.Book ="";
        // this.onClick = this.onClick.bind(this);
    }
	state = {
		result : false,
		isLoading : false,
		lang:'en',
		limit:'100',
		bookId: 0,
		chapterId: 1,
		verseId: 1,
		books:[],
		chapters :[],
		verseCount:[],
		verses:[],
		api :[{"user": "Genesisss"}]
	  }

	  apiUrl (method)
	  {
		  return (method+'?lang='+this.state.lang+'&limit='+this.state.limit);
	  }

	componentDidMount()
	{
		fetch(fieldConstants.baseUrl+this.apiUrl(fieldConstants.fullDetails))
		// fetch("http://localhost:5000/api/getFullDetails?lang=en&limit=50")
		.then(result => result.json()).then(res => {
			// console.log('url')
			// console.log(res);
			this.setState({
				isLoading : true,
				result : res.success,
				books : res.data.books,
				chapters : res.data.chapters,
				verseCount : res.data.versecounts,
				verses : res.data.verses,
				verseHeader : res.data.books[0].human +' '+ res.data.chapters[0].chapters[0].Chapter
				// verseHeader : res.data.books[0].human
			});	
			window.scroll_into_view(1);
		}).catch(res => {
			console.log(res);
			this.setState({
				isLoading : true,
				result : false
			});
		});
	}


	onBookClickHandler = (bookId, book) =>{	   
		this.setState({bookId: bookId})
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ book: bookId })
		}

		fetch(fieldConstants.baseUrl+this.apiUrl(fieldConstants.chapterAndDetails), requestOptions)
		// fetch("http://localhost:5000/api/getFullDetails?lang=en&limit=50")
		.then(result => result.json()).then(res => {
			// console.log('url')
			this.setState({
				isLoading : true,
				result : res.success,
				chapters : res.data.chapters,
				verseCount : res.data.versecounts,
				verses : res.data.verses,
				verseHeader : book + " 1"
			});	
			window.scroll_into_view(1);		
		}).catch(res => {
			console.log(res);
			this.setState({
				isLoading : true,
				result : false
			});
		});
	}
	
	onChapterClickHandler = (chapId) =>{
		this.setState({
			chapterId: chapId
		})
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ book: this.state.bookId, chapter: chapId })
		}

		fetch(fieldConstants.baseUrl+this.apiUrl(fieldConstants.verseAndDetails), requestOptions)
		// fetch("http://localhost:5000/api/getFullDetails?lang=en&limit=50")
		.then(result => result.json()).then(res => {
			// console.log('url')
			this.setState({
				isLoading : true,
				result : res.success,
				verseCount : res.data.versecounts,
				verses : res.data.verses,				
			});		
			window.scroll_into_view(1);	
		}).catch(res => {
			console.log(res);
			this.setState({
				isLoading : true,
				result : false
			});
		});
		
	}
	
	onVerseClickHandler = (verseId) =>{
		// console.log(verseId);
		// const requestOptions = {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({ book: this.state.bookId, chapter: this.state.chapterId })
		// }

		// fetch(fieldConstants.baseUrl+this.apiUrl(fieldConstants.verseDetails), requestOptions)
		// // fetch("http://localhost:5000/api/getFullDetails?lang=en&limit=50")
		// .then(result => result.json()).then(res => {
		// 	// console.log('url')
		// 	this.setState({
		// 		isLoading : true,
		// 		result : res.success,
		// 		verses : res.data.verses,				
		// 	});			
		// }).catch(res => {
		// 	console.log(res);
		// 	this.setState({
		// 		isLoading : true,
		// 		result : false
		// 	});
		// });

		this.setState({
			verseId: verseId
		})
		this.refs.child.callChildFunction(verseId);
	}
		
	render() {
		let person = (<div className="application fixed-layout">
		<NavScreen header = {this.state.verseHeader}/>
		<main className="verse-viewport">
			<aside className="sidebar left">
				<div className="books_list">
			<div className="list_title">Books</div>
					<BookList 
					books = {this.state.books} 
					onClick={this.onBookClickHandler}/>
				</div>

				<div className="chapters_list">
					<div className="list_title">Chapter</div>
					{this.state.chapters.map(chaps =>{
						return(<ChapterList 
							key={chaps.bookId} 
							onClick={this.onChapterClickHandler} 
							chapters={chaps.chapters}/>);
					})}
				</div>

				<div className="verse_list">
					<div className="list_title">Verse</div>
					{this.state.verseCount.map(verse =>{
						return(<VerseList 
							key={verse.chapter} 
							onClicks={this.onVerseClickHandler} 
							verse={verse.verse}/>);
					})}
					
				</div>
			</aside>

			<article className="bible__chapters">
				<div className="container">
					{this.state.verses.map(verse =>{
						return(<VerseScreen 
							key={verse.bookId} 
							ref="child" 
							onVerseClickHandler={this.state.verseId} 
							verses={verse.chapters}/>);
					})}
					
				</div>
			</article>

			<aside className="sidebar right"></aside>
		</main>

		<footer></footer>
		</div>);
		return (
		<div>{

		<div className="application fixed-layout">			
			{this.state.result ? person : <div>Loading...</div>}

			<footer></footer>
			</div>}
		</div>);
	}
}

export default HomeScreen;
