import React from 'react';

class BookList extends React.Component {

    state = {
        activeIndex: 0
    }

    onClickHandler(itemId, book) {
        this.setState({
            activeIndex :itemId
        })
        this.props.onClick(itemId, book)
    }


    render() {
		let iterates = 0;
        return (
            <ul>
                {
                    this.props.books.map(item => {
                    	iterates++;
                        const className = this.state.activeIndex === item.bookId ? 'active' : null;
                        return (  <div>
							{iterates === 40 ? <li className='divider'>New Testament</li>: null}
                            {/*// <li title={item.human} key={item.id} onClick={this.props.onClick.bind(this, item.id)}>{item.human}</li>);*/}
                            <li className={className} title={item.human} key={item.id} onClick={() => this.onClickHandler(item.bookId, item.human)}><span>{item.human}</span></li>
							</div>
							);
                    })
                }
                {/* <li title='Genesis'>Genesis</li>
                <li title='Exodus'>Exodus</li>
                <li title='Leviticus'>Leviticus</li>
                <li class="active" title='Numbers'>Numbers</li>
                <li title='Deuteronomy'>Deuteronomy</li>
                <li title='Joshua'>Joshua</li>
                <li title='Judges'>Judges</li>
                <li title='Ruth'>Ruth</li>
                <li title='1 Samuel'>1 Samuel</li>
                <li title='2 Samuel'>2 Samuel</li>
                <li title='1 Kings'>1 Kings</li>
                <li title='2 Kings'>2 Kings</li>
                <li title='1 Chronicles'>1 Chronicles</li>
                <li title='2 Chronicles'>2 Chronicles</li>
                <li title='Ezra'>Ezra</li>
                <li title='Nehemiah'>Nehemiah</li>
                <li title='Esther'>Esther</li>
                <li title='Job'>Job</li>
                <li title='Psalms'>Psalms</li>
                <li title='Proverbs'>Proverbs</li>
                <li title='Ecclesiastes'>Ecclesiastes</li>
                <li title='Song of Solomon'>Song of Solomon</li>
                <li title='Isaiah'>Isaiah</li>
                <li title='Jeremiah'>Jeremiah</li>
                <li title='Lamentations'>Lamentations</li>
                <li title='Ezekiel'>Ezekiel</li>
                <li title='Daniel'>Daniel</li>
                <li title='Hosea'>Hosea</li>
                <li title='Joel'>Joel</li>
                <li title='Amos'>Amos</li>
                <li title='Obadiah'>Obadiah</li>
                <li title='Jonah'>Jonah</li>
                <li title='Micah'>Micah</li>
                <li title='Nahum'>Nahum</li>
                <li title='Habakkuk'>Habakkuk</li>
                <li title='Zephaniah'>Zephaniah</li>
                <li title='Haggai'>Haggai</li>
                <li title='Zechariah'>Zechariah</li>
                <li title='Malachi'>Malachi</li>
                <li class='divider'>New Testament</li>
                <li title='Matthew'>Matthew</li>
                <li title='Mark'>Mark</li>
                <li title='Luke'>Luke</li>
                <li title='John'>John</li>
                <li title='Acts'>Acts</li>
                <li title='Romans'>Romans</li>
                <li title='1 Corinthians'>1 Corinthians</li>
                <li title='2 Corinthians'>2 Corinthians</li>
                <li title='Galatians'>Galatians</li>
                <li title='Ephesians'>Ephesians</li>
                <li title='Philippians'>Philippians</li>
                <li title='Colossians'>Colossians</li>
                <li title='1 Thessalonians'>1 Thessalonians</li>
                <li title='2 Thessalonians'>2 Thessalonians</li>
                <li title='1 Timothy'>1 Timothy</li>
                <li title='2 Timothy'>2 Timothy</li>
                <li title='Titus'>Titus</li>
                <li title='Philemon'>Philemon</li>
                <li title='Hebrews'>Hebrews</li>
                <li title='James'>James</li>
                <li title='1 Peter'>1 Peter</li>
                <li title='2 Peter'>2 Peter</li>
                <li title='1 John'>1 John</li>
                <li title='2 John'>2 John</li>
                <li title='3 John'>3 John</li>
                <li title='Jude'>Jude</li>
                <li title='Revelation'>Revelation</li> */}
            </ul>
        );
    }
}

export default BookList;