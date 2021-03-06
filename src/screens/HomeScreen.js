import React from 'react';
import logo from '../logo.svg';
import ReactDOM from 'react-dom';
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

		this.element1 = React.createRef()
		this.verseDetailRef = React.createRef()
		// this.myRef = React.createRef();
		// this.myRef = element => {
		// 	this.verselist = element;

		//   };
		// fieldConstants.Book ="";
		// this.onClick = this.onClick.bind(this);
	}
	state = {
		result: false,
		isLoading: false,
		lang: 'ta',
		limit: '100',
		bookId: 0,
		chapterId: 1,
		verseId: 1,
		book:'',
		books: [],
		chapters: [],
		verseCount: [],
		verses: [],
		api: [{ "user": "Genesis" }]
	}

	apiUrl(method) {
		return (method + '?lang=' + this.state.lang + '&limit=' + this.state.limit);
	}

	componentDidMount() {
		fetch(fieldConstants.baseUrl + this.apiUrl(fieldConstants.fullDetails))
			// fetch("http://localhost:5000/api/getFullDetails?lang=en&limit=50")
			.then(result => result.json()).then(res => {
				// console.log('url')
				// console.log(res);
				this.setState({
					isLoading: true,
					result: res.success,
					books: res.data.books,
					chapters: res.data.chapters,
					verseCount: res.data.versecounts,
					verses: res.data.verses,
					book:res.data.books[0].human,
					verseHeader: res.data.books[0].human + ' ' + res.data.chapters[0].chapters[0].Chapter
					// verseHeader : res.data.books[0].human
				});
				// console.log('this element ssss', this.element1);
				if (this.element1)
					this.element1.current.addEventListener("scroll", (e) => {
						if(this.element1.current.scrollTop === 1){
							console.log('event ', e);
							console.log('this.element1.current.scrollTop', this.element1.current.scrollTop);
							console.log('this.element1.current.clientHeight', this.element1.current.clientHeight);
							console.log('this.element1.current.scrollHeight', this.element1.current.scrollHeight);
						}
						else if (this.element1.current.scrollTop + this.element1.current.clientHeight >= this.element1.current.scrollHeight) {
							console.log('this.element1.current', this.element1.current);
							console.log('this.element1.current.scrollTop', this.element1.current.scrollTop);
							console.log('this.element1.current.clientHeight', this.element1.current.clientHeight);
							console.log('this.element1.current.scrollHeight', this.element1.current.scrollHeight);
						} else if (this.element1.current.scrollBottom + this.element1.current.clientHeight >= this.element1.current.scrollHeight) {
							console.log('Scrollssss');
						}
					});
				// this.element1.current.addEventListener("scroll", this.handleNvEnter);
				// window.scroll_into_view('Ver1');

			}).catch(res => {
				console.log(res);
				this.setState({
					isLoading: true,
					result: false
				});
			});


		// ReactDOM.findDOMNode(this.element).addEventListener("nv-enter", this.handleNvEnter);
		// console.log('this element ', this.element1);
		// if(this.element)
		// this.element1.current.addEventListener("scroll", () => {
		// 	console.log('Scrolls');
		// 	if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=this.refs.iScroll.scrollHeight){
		// 	  console.log('Scrolls');
		// 	}
		//   });
	}

	handleNvEnter = (event) => {
		console.log("Nv Enter:", event);
	}

	onBookClickHandler = (bookId, book) => {
		this.setState({
			bookId: bookId ,
			book: book
		})
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ book: bookId })
		}

		fetch(fieldConstants.baseUrl + this.apiUrl(fieldConstants.chapterAndDetails), requestOptions)
			// fetch("http://localhost:5000/api/getFullDetails?lang=en&limit=50")
			.then(result => result.json()).then(res => {
				console.log('res', res.data)
				console.log('url' +res)
				this.setState({
					isLoading: true,
					result: res.success,
					chapters: res.data.chapters,
					verseCount: res.data.versecounts,
					verses: res.data.verses,
					verseHeader: book + " 1"
				});
				window.scroll_into_view('Ver1');
			}).catch(res => {
				console.log(res);
				this.setState({
					isLoading: true,
					result: false
				});
			});
	}

	onChapterClickHandler = (chapId) => {
		this.setState({
			chapterId: chapId
		})
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ book: this.state.bookId, chapter: chapId })
		}

		fetch(fieldConstants.baseUrl + this.apiUrl(fieldConstants.verseAndDetails), requestOptions)
			// fetch("http://localhost:5000/api/getFullDetails?lang=en&limit=50")
			.then(result => result.json()).then(res => {
				// console.log('url')
				this.setState({
					isLoading: true,
					result: res.success,
					verseCount: res.data.versecounts,
					verses: res.data.verses,
					verseHeader:this.state.book +' '+ chapId
				});
				window.scroll_into_view('Ver1');
			}).catch(res => {
				console.log(res);
				this.setState({
					isLoading: true,
					result: false
				});
			});

	}

	onVerseClickHandler = (verseId) => {
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
		// this.refs.child.callChildFunction(verseId);
		console.log('verseDetailRef', this.verseDetailRef)
		this.verseDetailRef.current.callChildFunction(verseId);
	}

	prevHandler = () => {
		console.log('Hi');
	}
	nextHandler = () => {
		console.log('Hi');
	}

	render() {
		let person = (
		<div className="application fixed-layout">
			<NavScreen onPrevHandler = {this.prevHandler} onNextHandler = {this.prevHandler} header={this.state.verseHeader} />

			<main className="verse-viewport">
				<aside className="sidebar left">
					<div className="books_list">
						<div className="list_title">Books</div>
						<BookList
							books={this.state.books}
							onClick={this.onBookClickHandler} />
					</div>

					<div className="chapters_list">
						<div className="list_title">Chapter</div>
						{this.state.chapters.map(chaps => {
							return (<ChapterList
								key={chaps.bookId}
								onClick={this.onChapterClickHandler}
								chapters={chaps.chapters} />);
						})}
					</div>

					<div className="verses_list">
						<div className="list_title">Verse</div>
						{this.state.verseCount.map(verse => {
							return (<VerseList
								key={verse.id}
								onClicks={this.onVerseClickHandler}
								verse={verse.verse} />);
						})}

					</div>
				</aside>

				<article className="bible__chapters" ref={this.element1} role="main">
					<div className="container">
						{this.state.verses.map(verse => {
							return (<VerseScreen
								key={verse.bookId}
								// ref="child"
								ref={this.verseDetailRef}
								// ref={el => this.element = el}
								onVerseClickHandler={this.state.verseId}
								verses={verse.chapters} />);
						})}


					</div>
				<div class="viewport-settings">
					<div class="viewport-settings__wrapper">
						<button class="viewport-settings__toggle">
							<em class="svg-icon">
								<svg>
									<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#tune"} />
								</svg>
							</em>
						</button>
						<div class="viewport-settings__dropdown">
							<div class="settings-group alignment">
								<div class="settings-group__label">Alignment</div>
								<div class="settings-group__input-field">
									<input type="radio" id="alignment-left" name="alignment" checked />
									<label for="alignment-left">
										<em class="svg-icon"><svg>
												<use xlinkHref={"/public/svg/sprite-icons.svg#format-left"} /></svg></em>
									</label>
								</div>
								<div class="settings-group__input-field">
									<input type="radio" id="alignment-justify" name="alignment" />
									<label for="alignment-justify">
										<em class="svg-icon"><svg>
												<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#format-justify" }/>
												</svg></em>
									</label>
								</div>
								<div class="settings-group__input-field">
									<input type="radio" id="alignment-center" name="alignment" />
									<label for="alignment-center">
										<em class="svg-icon"><svg>
												<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#format-center"} />
												</svg></em>
									</label>
								</div>
							</div>
							<div class="settings-group text-size">
								<div class="settings-group__label">Text size</div>
								<div class="settings-group__input-field">
									<input type="radio" id="font-size-10" name="font-size" />
									<label for="font-size-10">
										10
									</label>
								</div>
								<div class="settings-group__input-field">
									<input type="radio" id="font-size-12" name="font-size" />
									<label for="font-size-12">
										12
									</label>
								</div>
								<div class="settings-group__input-field">
									<input type="radio" id="font-size-14" name="font-size" checked />
									<label for="font-size-14">
										14
									</label>
								</div>
								<div class="settings-group__input-field">
									<input type="radio" id="font-size-16" name="font-size" />
									<label for="font-size-16">
										16
									</label>
								</div>
								<div class="settings-group__input-field">
									<input type="radio" id="font-size-18" name="font-size" />
									<label for="font-size-18">
										18
									</label>
								</div>
							</div>
							<div class="settings-group font-variant">
								<div class="settings-group__label">Text size</div>
								<div class="settings-group__input-field">
									<input type="radio" id="font-variant-1" name="font-variant" checked />
									<label for="font-variant-1">
										EB Garamond
									</label>
								</div>
								<div class="settings-group__input-field">
									<input type="radio" id="font-variant-2" name="font-variant" />
									<label for="font-variant-2">
										Georgia
									</label>
								</div>
								<div class="settings-group__input-field">
									<input type="radio" id="font-variant-3" name="font-variant" />
									<label for="font-variant-3">
										Nunito Sans
									</label>
								</div>
								<div class="settings-group__input-field">
									<input type="radio" id="font-variant-4" name="font-variant" />
									<label for="font-variant-4">
										Arial
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>


				</article>

				<aside class="sidebar right">
					<div class="search-coming-soon flex-center">
						<div>
						<img src={process.env.PUBLIC_URL + "/images/search_illustration.svg"}/>
							<div class="flex-center">
								<em class="svg-icon" role="button">
									<svg>
										<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#search"} />
									</svg>
								</em>
								Search
							</div>
							<p>Coming soon</p>
						</div>
					</div>
				</aside>
			</main>

			<footer>
			<div class="foot__credits">
				Made<em class="svg-icon">
					<svg>
						<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#hearts"} />
					</svg>
				</em>with Jesus
			</div>
		</footer>
		</div>
		);
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
