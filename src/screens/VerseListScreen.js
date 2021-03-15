import React from 'react';
var refs;

class VerseList extends React.Component{

	constructor(props) {
		super(props);
		refs = this.props.verse.reduce((acc, value) => {
			// console.log('value',value)
			acc[value.verseCount] = React.createRef();
			return acc;
		}, {});
	}

	state = {
		indexActive: 1
	}

    onClickHandler(itemId, itemCount) {
        this.setState({
            indexActive :itemCount
        })
        this.props.onClicks(itemId)
    }


    render(){
		const {indexActive} = this.state
        return(
			<ul>
				{
					this.props.verse.map(verseNos =>
					{
						console.log('verseNos.VerseCount',verseNos.VerseCount % 2 === 0)
						const className = indexActive === verseNos.VerseCount ? 'active' : null;
						return (
						<li class={className} id={verseNos.id}key={verseNos.id} ref={refs[verseNos.id]} onClick={() => this.onClickHandler(verseNos.key, verseNos.VerseCount )}><span>{verseNos.VerseCount}</span></li>
						);
					})

				}
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

export default VerseList;