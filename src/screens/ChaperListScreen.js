import React from 'react';

var refs;
class ChapterList extends React.Component {

	constructor(props) {
		super(props);
		refs = this.props.chapters.chapters.reduce((acc, value) => {
			// console.log('value',value)
			acc[value.verseCount] = React.createRef();
			return acc;
		}, {});
	}

    state = {
        activeIndex: 1
    }

	onClickHandler(chapter) {
        this.setState({
            activeIndex :chapter
        })
        this.props.onClick(chapter, this.props.book)
    }

	forceUpdateHandler(chapterNo){
		this.setState({
			activeIndex :chapterNo
		}
		// , () => this.forceUpdate()
		)
	};

	render() {
        return (
            <ul>
                {this.props.chapters.chapters.map(chap => {
					// console.log('chap id', chap.id)
                    const className = this.state.activeIndex === chap.Chapter ? 'active' : null;
                    return (<li class={className} id={chap.id} ref={refs[chap.id]} key={chap.id} onClick={() => this.onClickHandler(chap.Chapter)}><span>{chap.Chapter}</span></li>);
                })}
                {/* <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li class="active">8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
                <li>14</li>
                <li>15</li>
                <li>16</li>
                <li>17</li>
                <li>18</li>
                <li>19</li>
                <li>20</li>
                <li>21</li>
                <li>22</li>
                <li>23</li>
                <li>24</li>
                <li>25</li>
                <li>26</li>
                <li>27</li>
                <li>28</li> */}
            </ul>
        );
    }
}

export default ChapterList;