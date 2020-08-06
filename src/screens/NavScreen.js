import React, { Image } from 'react';
import ProfileIcon from '../logo.svg'

const nav = (props) => {
    return (
        <header>
            <nav class="navbar">
				<div class="left">
					<div class="logo">
						<em class="svg-icon">
							<svg>
								<use xlinkHref="/public/svg/sprite-icons.svg#album" />
							</svg>
						</em>
						BIBLE
					</div>
				</div>
				<div class="center">
					<div class="chapter__nav">
						<div class="chapter__nav__prev">
							<em class="svg-icon" role="button">
								<svg>
									<use xlinkHref="/public/svg/sprite-icons.svg#chevron-left" />
								</svg>
							</em>
						</div>
						<div class="chapter__nav__name serif">
							Psalm 91
						</div>
						<div class="chapter__nav__next">
							<em class="svg-icon" role="button">
								<svg>
									<use xlinkHref="/public/svg/sprite-icons.svg#chevron-right" />
								</svg>
							</em>
						</div>
					</div>
				</div>
				<div class="right">
					<div class="nav__icons">
						<div class="search__icon">
							<em class="svg-icon" role="button">
								<svg>
									<use xlinkHref="/public/svg/sprite-icons.svg#search" />
								</svg>
							</em>
						</div>
						<div class="cog__icon">
							<em class="svg-icon" role="button">
								<svg>
									<use xlinkHref="/public/svg/sprite-icons.svg#options" />
								</svg>
							</em>
						</div>
					</div>
				</div>
			</nav>
        </header>

    );
}

export default nav;
