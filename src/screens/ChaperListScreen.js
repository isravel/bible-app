import React from 'react';

class ChapterList extends React.Component {

    state = {
        activeIndex: 1
    }

    onClickHandler(itemId) {
        this.setState({
            activeIndex :itemId
        })
        this.props.onClick(itemId)
    }

    render() {
        return (
            <ul>
                {this.props.chapters.map(chap => {
                    const className = this.state.activeIndex === chap.Chapter ? 'active' : null;
                    return (<li class={className} key={chap.Chapter} onClick={() => this.onClickHandler(chap.Chapter)}><span>{chap.Chapter}</span></li>);
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