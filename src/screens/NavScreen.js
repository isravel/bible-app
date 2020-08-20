import React, { Image } from 'react';
import ProfileIcon from '../logo.svg'

const nav = (props) => {
    return (
        <header>
            <nav className="navbar">
                <div className="left">
                    <div className="logo">
                        <em className="svgIcon"><svg xmlns="http://www.w3.org/2000/svg"><use xlinkHref="#book" /></svg></em>
                        BIBLE
                    </div>
                </div>
                <div className="center">
                    <div className="chapter__nav">
                        <div className="chapter__nav__prev">
                            <em className="svgIcon"><svg xmlns="http://www.w3.org/2000/svg"><use xlinkHref="#chevron-back-outline" /></svg></em>
                        </div>
                        <div className="chapter__nav__name">
                           {props.header}
                        </div>
                        <div className="chapter__nav__next">
                            <em className="svgIcon"><svg xmlns="http://www.w3.org/2000/svg"><use xlinkHref="#chevron-forward-outline" /></svg></em>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="nav__icons">
                        <div className="search__icon">
                            <em className="svgIcon"><svg xmlns="http://www.w3.org/2000/svg"><use xlinkHref="#search-outline" /></svg></em>
                        </div>
                        <div className="cog__icon">
                            <em className="svgIcon"><svg xmlns="http://www.w3.org/2000/svg"><use xlinkHref="#cog-outline" /></svg></em>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    );
}

export default nav;
