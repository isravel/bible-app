import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import home from './HomeScreen.module.css';
import NavScreen from './NavScreen';
import BookList from './BookListScreen';
import ChapterList from './ChaperListScreen';
import VerseList from './VerseListScreen';
import ChapterScreen from './ChapterScreen';


class HomeScreen extends React.Component{
    render(){
        return (
            <div className="App">
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
			<aside class="sidebar right">
			</aside>
		</main>
		<footer></footer>
            </div>
        );
    }
}

export default HomeScreen;