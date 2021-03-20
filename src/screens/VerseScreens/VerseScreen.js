import React from 'react';
import VerseItem from './VerseItemScreen';

class VerseScreen extends React.Component {

    constructor(props)
    {
        super(props);
        this.myRef = element => {
            this.verseItem = element;
        }

    }


    state = {
        verses: []
    }

    callChildFunction = (id) => {
        console.log("verse screen", id);
        // this.refs.child.handleClick(id);
        this.verseItem.handleClick(id);

        // this.child.handleActionParent();  ///calling a child function here
    }




    render() {
        return (
            <div>
                <div className="bible__chapters__chapter serif">
                    {
                        this.props.verses.map(res => {
                            return (<div id={res.id} key={res.id} >
                                <div className="bible__chapters__title bold" >{res.book + ' ' + (res.chapter)}</div>
                                <VerseItem ref={this.myRef}  verse={res.verseData} />
                            </div>);
                        })

                    }

                </div>
            </div>
        );
    }
}

export default VerseScreen;