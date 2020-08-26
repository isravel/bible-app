import React from 'react';
var refs;
class VerseItemScreen extends React.Component {

	constructor(props) {
		super(props);
		refs = this.props.verse.reduce((acc, value) => {
			// console.log('value',value)
			acc[value.verseId] = React.createRef();
			return acc;
		}, {});

	}

	handleClick = (id) => {

		refs[id].current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
		// window.scroll_into_view(id);
	}

	componentDidMount() {

	}

	// handleClick = (id)=>{
	//     console.log(id);

	// }
	render() {
		// const id = this.props.onVerseClick;
		// // console.log('id ', id);
		// const refs = this.props.verse.reduce((acc, value) => {
		//     // console.log('value',value)
		//     acc[value.verseCount] = React.createRef();
		//     return acc;
		//   }, {});

		//   const handleClick = (id) =>{console.log(id);
		//     refs[id].current.scrollIntoView({
		//     behavior: 'smooth',
		//     block: 'start',
		//     });}
		return (
			<div>
				<ul className="bible__chapters__verses">
					{
						this.props.verse.map(res => {
							console.log(res.verseId)
							return (<li id={res.verseId} key={res.verseId} ref={refs[res.verseId]} ><span className="verse_number">{res.verseNo}</span><span class='verse_text'>{res.verse}</span></li>);
						})

					}

				</ul>
			</div>
		);
	}
}

export default VerseItemScreen;