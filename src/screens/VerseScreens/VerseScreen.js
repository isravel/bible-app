import React from 'react';
import VerseItem from './VerseItemScreen';

class VerseScreen extends React.Component {
    state = {
        verses: []
    }

    callChildFunction = (id) => {
        // console.log("asdfsdfsd", id);
        this.refs.child.handleClick(id);
        
        // this.child.handleActionParent();  ///calling a child function here
    }




    render() {
        return (
            <div>
                <div className="bible__chapters__chapter serif">
                    {
                        this.props.verses.map(res => {
                            return (<div id={res.chapter} key={res.chapter} >
                                <div className="bible__chapters__title" >{res.book + ' ' + (res.chapter)}</div>
                                <VerseItem ref="child" onVerseClick={this.props.onVerseClickHandler} verse={res.verseData} />
                            </div>);
                        })

                    }

                </div>
            </div>
        );
    }
}

export default VerseScreen;