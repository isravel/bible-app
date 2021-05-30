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
import cookies from '../services/CookieServices';
import i18next from '../i18n';


class HomeScreen extends React.Component {

	constructor(props) {
		super(props)
		this.element1 = React.createRef()
		this.verseDetailRef = React.createRef()
		this.bookListRef = React.createRef()
		this.chapterListRef = React.createRef()
		this.onVerseChangeRef = React.createRef()
		// this.setLanguageCookie()
		//
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
		lang: fieldConstants.lang,
		limit: '100',
		bookId: 0,
		chapterId: 1,
		verseId: 1,
		books: [],
		chapters: [],
		verseCount: [],
		verses: [],
		prevBook: {},
		nextBook: {}
	}


	apiUrl(method) {
		return (method + '?lang=' + this.state.lang + '&limit=' + this.state.limit);
	}

	// setLanguageCookie(language='ta')
	// {
	// 	const expiresAt = 60 * 24 * 2 * 365
	// 	let d = new Date();
	// 	d.setTime(d.getTime() + (expiresAt * 60 * 1000));
	// 	console.log('Languages', language)
	// 	const options = { path: '/', expires: d }
	// 	cookies.set(fieldConstants.selected_lang, language, options)
	// }

	componentDidMount() {
		this.getCredentials()
	}

	getLanguage = () => {
		let lang = cookies.get(fieldConstants.selected_lang)
		if (lang) {
			return lang
		} else {
			const defLang = {value: 'en', label: 'English'}
			return defLang
		}
	}

	getCredentials = () => {
		let langCookie = this.getLanguage().value
		if (langCookie) {
			this.setState({
					lang: langCookie
				}, () => {
					this.fetchAllDetails()
					i18next.changeLanguage(langCookie)
				}
			)
		} else this.fetchAllDetails()
	}

	fetchAllDetails = () => {
		fetch(fieldConstants.baseUrl + this.apiUrl(fieldConstants.fullDetails))
			// fetch("http://localhost:5000/api/getFullDetails?lang=en&limit=50")
			.then(result => result.json()).then(res => {
			this.setState({
				isLoading: true,
				result: res.success,
				books: res.data.books,
				chapters: res.data.chapters,
				verseCount: res.data.versecounts,
				verses: res.data.verses,
				bookId: res.data.books[0].bookId,
				// verseHeader: res.data.books[0].human + ' ' + res.data.chapters[0].chapters[0].Chapter,
				verseHeader: res.data.currentPage.book + ' ' + res.data.currentPage.chapter,
				prevBook: res.data.prevBook,
				nextBook: res.data.nextBook
				// verseHeader : res.data.books[0].human
			}, () => {
				window.scroll_into_view('Ver1');
			});

			// if (this.element1)
			// 	this.element1.current.addEventListener("scroll", (e) => {
			// 		if(this.element1.current.scrollTop === 1){
			// 			console.log('event ', e);
			// 			console.log('this.element1.current.scrollTop', this.element1.current.scrollTop);
			// 			console.log('this.element1.current.clientHeight', this.element1.current.clientHeight);
			// 			console.log('this.element1.current.scrollHeight', this.element1.current.scrollHeight);
			// 		}
			// 		else if (this.element1.current.scrollTop + this.element1.current.clientHeight >= this.element1.current.scrollHeight) {
			// 			console.log('this.element1.current', this.element1.current);
			// 			console.log('this.element1.current.scrollTop', this.element1.current.scrollTop);
			// 			console.log('this.element1.current.clientHeight', this.element1.current.clientHeight);
			// 			console.log('this.element1.current.scrollHeight', this.element1.current.scrollHeight);
			// 		} else if (this.element1.current.scrollBottom + this.element1.current.clientHeight >= this.element1.current.scrollHeight) {
			// 			console.log('Scrollssss');
			// 		}
			// 	});
			// this.element1.current.addEventListener("scroll", this.handleNvEnter);


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

	onBookClickHandler = (bookId) => {
		this.setState({
			bookId: bookId
		})

		const requestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({book: bookId, chapter: 1})
		}

		fetch(fieldConstants.baseUrl + this.apiUrl(fieldConstants.chapterAndDetails), requestOptions)
			// fetch("http://localhost:5000/api/getFullDetails?lang=en&limit=50")
			.then(result => result.json()).then(res => {
			if (res.success) {
				this.setState({
						isLoading: true,
						result: res.success,
						verseCount: res.data.versecounts,
						chapters: res.data.chapters,
						verses: res.data.verses,
						// verseHeader: book + " 1"
						verseHeader: res.data.currentPage.book + ' ' + res.data.currentPage.chapter,
						prevBook: res.data.prevBook,
						nextBook: res.data.nextBook
					}, () => {
						this.onVerseChangeRef.current.verseForceUpdateHandler(1)
					}, () => {
						window.scroll_into_view('Ver1');
					}
				);

				// window.scroll_into_view('Cha11');
			} else {
				//Bad response
			}
		}).catch(res => {
			console.log(res);
			this.setState({
				isLoading: true,
				result: false
			});
		});
	}

	onPrevNextClickHandler = (bookId, chapterId, cb) => {
		// if(chapterId === undefined)
		// {
		// 	chapterId = 1
		// }

		this.setState({
			bookId: bookId
		})

		const requestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({book: bookId, chapter: chapterId})
		}

		fetch(fieldConstants.baseUrl + this.apiUrl(fieldConstants.chapterAndDetails), requestOptions)
			// fetch("http://localhost:5000/api/getFullDetails?lang=en&limit=50")
			.then(result => result.json()).then(res => {
			if (res.success) {
				console.log('res', res)
				this.setState({
						isLoading: true,
						result: res.success,
						chapters: res.data.chapters,
						verseCount: res.data.versecounts,
						verses: res.data.verses,
						// verseHeader: book + " 1"
						verseHeader: res.data.currentPage.book + ' ' + res.data.currentPage.chapter,
						prevBook: res.data.prevBook,
						nextBook: res.data.nextBook
					}, () => {
						cb()
						console.log('Book id', this.state.bookId)
						window.scroll_into_view('Ver1');
					}
				);
				// window.scroll_into_view('Cha11');
			} else {
				//Bad response
			}
		}).catch(res => {
			console.log(res);
			this.setState({
				isLoading: true,
				result: false
			});
		});
	}

	onChapterClickHandler = (chapId) => {
		console.log('onChapterClickHandler', chapId)
		this.setState({
			chapterId: chapId,
		})
		const requestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({book: this.state.bookId, chapter: chapId})
		}

		fetch(fieldConstants.baseUrl + this.apiUrl(fieldConstants.verseAndDetails), requestOptions)
			// fetch("http://localhost:5000/api/getFullDetails?lang=en&limit=50")
			.then(result => result.json()).then(res => {
			this.setState({
					isLoading: true,
					result: res.success,
					verseCount: res.data.versecounts,
					verses: res.data.verses,
					verseHeader: res.data.currentPage.book + ' ' + chapId,
					prevBook: res.data.prevBook,
					nextBook: res.data.nextBook
				},
				() => {
					window.scroll_into_view('Ver1');
				});

		}).catch(res => {
			console.log(res);
			this.setState({
				isLoading: true,
				result: false
			});
		});
	}

	onVerseClickHandler = (verseId) => {
		console.log('verse change handler itemId', verseId);
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
		// console.log('verseDetailRef', this.verseDetailRef)
		// this.verseDetailRef.current.callChildFunction(verseId);
		window.scroll_into_view(this.state.bookId);
		window.scroll_into_view(verseId);
	}

	onBookStateChangeListener = (bookNo, chapterNo) => {
		this.bookListRef.current.forceUpdateHandler(bookNo)
		this.chapterListRef.current.forceUpdateHandler(chapterNo)
	}

	onPrevClick = () => {
		const {prevBook} = this.state
		if (Object.keys(prevBook).length != 0) {
			// this.setState({
			// 	bookId:prevBook.book
			// },
			// () => {
			this.onPrevNextClickHandler(prevBook.book, prevBook.chapter, () => {
				this.onBookStateChangeListener(prevBook.book, prevBook.chapter)
				window.scroll_into_view(this.state.bookId);
			})

			// }
			// )

		}

	}
	onNextClick = () => {
		const {nextBook} = this.state
		if (Object.keys(nextBook).length != 0) {
			// this.setState({
			// 	bookId:nextBook.book
			// }, () => {
			console.log('Next click', nextBook)
			this.onPrevNextClickHandler(nextBook.book, nextBook.chapter, () => {
				this.onBookStateChangeListener(nextBook.book, nextBook.chapter)
				console.log('Book', this.state.bookId)
				window.scroll_into_view(this.state.bookId);
			})
			// }
			// )

		}
	}

	render() {
		let person = (
			<div className="application fixed-layout">
				<NavScreen
					header={this.state.verseHeader}
					prevClick={this.onPrevClick}
					nextClick={this.onNextClick}
					onLanguageChange={this.getCredentials}
					defaultLanguage={this.getLanguage().label}
				/>

				<main className="verse-viewport">
					<aside className="sidebar left">
						<div className="books_list">
							<div className="list_title">{i18next.t("Books")}</div>
							<BookList
								ref={this.bookListRef}
								books={this.state.books}
								onClick={this.onBookClickHandler}
							/>
						</div>

						<div className="chapters_list">
							<div className="list_title">{i18next.t("Chapters")}</div>
							{this.state.chapters.map(chaps => {
								return (<ChapterList
									ref={this.chapterListRef}
									key={chaps.bookId}
									onClick={this.onChapterClickHandler}
									chapters={chaps}/>);
							})}
						</div>

						<div className="verses_list">
							<div className="list_title">{i18next.t("Verse")}</div>
							{this.state.verseCount.map(verse => {
								return (<VerseList
									ref={this.onVerseChangeRef}
									key={verse.id}
									onClicks={this.onVerseClickHandler}
									indexActive={1}
									verse={verse.verse}/>);
							})}

						</div>
					</aside>

					<article className="bible__chapters" ref={this.element1} role="main">

						<div className="viewport-settings">
							<div className="viewport-settings__wrapper">
								<button className="viewport-settings__toggle">
									<em className="svg-icon">
										<svg>
											<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#tune"}/>
										</svg>
									</em>
								</button>
								<div className="viewport-settings__dropdown">
									<div className="settings-group alignment">
										<div className="settings-group__label">Alignment</div>
										<div className="settings-group__input-field">
											<input type="radio" id="alignment-left" name="alignment" checked/>
											<label for="alignment-left">
												<em className="svg-icon">
													<svg>
														<use
															xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#format-left"}/>
													</svg>
												</em>
											</label>
										</div>
										<div className="settings-group__input-field">
											<input type="radio" id="alignment-justify" name="alignment"/>
											<label for="alignment-justify">
												<em className="svg-icon">
													<svg>
														<use
															xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#format-justify"}/>
													</svg>
												</em>
											</label>
										</div>
										<div className="settings-group__input-field">
											<input type="radio" id="alignment-center" name="alignment"/>
											<label for="alignment-center">
												<em className="svg-icon">
													<svg>
														<use
															xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#format-center"}/>
													</svg>
												</em>
											</label>
										</div>
									</div>
									<div className="settings-group text-size">
										<div className="settings-group__label">Text size</div>
										<div className="settings-group__input-field">
											<input type="radio" id="font-size-10" name="font-size"/>
											<label for="font-size-10">
												10
											</label>
										</div>
										<div className="settings-group__input-field">
											<input type="radio" id="font-size-12" name="font-size"/>
											<label for="font-size-12">
												12
											</label>
										</div>
										<div className="settings-group__input-field">
											<input type="radio" id="font-size-14" name="font-size" checked/>
											<label for="font-size-14">
												14
											</label>
										</div>
										<div className="settings-group__input-field">
											<input type="radio" id="font-size-16" name="font-size"/>
											<label for="font-size-16">
												16
											</label>
										</div>
										<div className="settings-group__input-field">
											<input type="radio" id="font-size-18" name="font-size"/>
											<label for="font-size-18">
												18
											</label>
										</div>
									</div>
									<div className="settings-group font-variant">
										<div className="settings-group__label">Text size</div>
										<div className="settings-group__input-field">
											<input type="radio" id="font-variant-1" name="font-variant" checked/>
											<label for="font-variant-1">
												EB Garamond
											</label>
										</div>
										<div className="settings-group__input-field">
											<input type="radio" id="font-variant-2" name="font-variant"/>
											<label for="font-variant-2">
												Georgia
											</label>
										</div>
										<div className="settings-group__input-field">
											<input type="radio" id="font-variant-3" name="font-variant"/>
											<label for="font-variant-3">
												Nunito Sans
											</label>
										</div>
										<div className="settings-group__input-field">
											<input type="radio" id="font-variant-4" name="font-variant"/>
											<label for="font-variant-4">
												Arial
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="container">
							{this.state.verses.map(verse => {
								return (<VerseScreen
									key={verse.bookId}
									// ref="child"
									ref={this.verseDetailRef}
									// ref={el => this.element = el}
									onVerseClickHandler={this.state.verseId}
									verses={verse.chapters}/>);
							})}
						</div>

					</article>

					<aside className="sidebar right">
						<div className="search-coming-soon flex-center">
							<div>
								<img src={process.env.PUBLIC_URL + "/images/search_illustration.svg"}/>
								<h1 className="flex-center">
									<em className="svg-icon" role="button">
										<svg>
											<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#search"}/>
										</svg>
									</em>
									Search
								</h1>
								<p>{i18next.t("Comming_Soon")}</p>
							</div>
						</div>
					</aside>
				</main>

				<footer>
					<div className="foot__credits">
						Made<em className="svg-icon">
						<svg>
							<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#hearts"}/>
						</svg>
					</em>with Jesus
					</div>
				</footer>
			</div>
		);
		return (
			<div>{

				<div>
					{this.state.result ? person : <div className="preloader">Loading...</div>}
				</div>}
			</div>);
	}
}

export default HomeScreen;
