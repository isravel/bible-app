import React, { Image } from 'react';
import ProfileIcon from '../logo.svg'

const nav = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="left">
                    <div className="logo">
                        <em className="svgIcon"><svg><use href="../public/svg/sprite-icons.svg#book" /></svg></em>
                        
                            BIBLE
                    </div>
                </div>
                <div className="center">
                    <div className="chapter__nav">
                        <div className="chapter__nav__prev">
                            <em className="svgIcon"><svg><use href="/public/svg/sprite-icons.svg#chevron-back-outline" /></svg></em>
                        </div>
                        <div className="chapter__nav__name">
                            Psalm 91
                        </div>
                        <div className="chapter__nav__next">
                            <em className="svgIcon"><svg><use href="/public/svg/sprite-icons.svg#chevron-forward-outline" /></svg></em>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="nav__icons">
                        <div className="search__icon">
                            <em className="svgIcon"><svg><use href="/public/svg/sprite-icons.svg#search-outline" /></svg></em>
                        </div>
                        <div className="cog__icon">
                            <em className="svgIcon"><svg><use href="/public/svg/sprite-icons.svg#cog-outline" /></svg></em>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    );
}

export default nav;