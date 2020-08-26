import React from 'react';

class VerseListScreen extends React.Component{

	state = {
		activeIndex: 1
	}

	onClickHandler(itemId, itemNo) {
		this.setState({
			activeIndex :itemNo
		})
		console.log('itemNo',itemNo)
		this.props.onClicks(itemId)
	}

	onChapterClickHandler() {
		this.setState({
			activeIndex :1
		})
	}

	render(){
		return(
			<ul>
				{
					this.props.verse.map(verseNos => {
						const className = this.state.activeIndex === verseNos.verseNo ? 'active' : null;
						return (
							<li class={className} id={verseNos.verseId} key={verseNos.verseId} onClick={() => this.onClickHandler(verseNos.verseMapId, verseNos.verseNo)}><span>{verseNos.verseNo}</span></li>);
					})}
				{/* <li class="active">1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
						<li>6</li>
						<li>7</li>
						<li>8</li>
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
						<li>28</li>
						<li>29</li>
						<li>30</li>
						<li>31</li>
						<li>32</li>
						<li>33</li>
						<li>34</li>
						<li>35</li> */}
			</ul>
		);
	}
}

export default VerseListScreen;