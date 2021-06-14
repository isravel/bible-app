import React, {Image} from 'react';
import ProfileIcon from '../logo.svg'
import i18next from '../i18n';
import Select from "react-select";
import cookies from '../services/CookieServices';
import fieldConstants from "../utils/FieldConstants";

// const Select = 'react-select';

function nav(props) {
	// const [t, i18n] = useTranslation();
	const options = [
		{value: 'ta', label: 'தமிழ்'},
		{value: 'en', label: 'English'}
	]

	function setLanguage(language) {
		const expiresAt = 60 * 24 * 2 * 365
		let d = new Date();
		d.setTime(d.getTime() + (expiresAt * 60 * 1000));
		console.log('Languages', language)
		const options = {path: '/', expires: d}
		cookies.set(fieldConstants.selected_lang, language, options)
	}

	function onLanguageChange(event) {
		setLanguage(event)
		props.onLanguageChange()
	}

	return (
		<header>
			<nav className="navbar">
				<div className="left">
					<div className="logo">
						<em className="svg-icon">
							<svg xmlns="http://www.w3.org/2000/svg">
								<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#album"}/>
							</svg>
						</em>
						{i18next.t("Bible")}
					</div>
					<em className="svg-icon menu-icon">
						<svg xmlns="http://www.w3.org/2000/svg">
							<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#menu"}/>
						</svg>
					</em>
				</div>
				<div className="center">
					<div className="chapter__nav">
						<div className="chapter__nav__prev">
							<em className="svg-icon" onClick={props.prevClick}>
								<svg xmlns="http://www.w3.org/2000/svg">
									<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#chevron-left"}/>
								</svg>
							</em>
						</div>
						<div className="chapter__nav__name">
							{props.header}
						</div>
						<div className="chapter__nav__next">
							<em className="svg-icon" onClick={props.nextClick}>
								<svg xmlns="http://www.w3.org/2000/svg">
									<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#chevron-right"}/>
								</svg>
							</em>

						</div>
					</div>
				</div>
				<div className="right">
					<div className="nav__icons">
						<div className="search__icon">
							<em className="svg-icon">
								<svg xmlns="http://www.w3.org/2000/svg">
									<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#search-outline"}/>
								</svg>
							</em>
						</div>
						<div className="cog__icon">
							<em className="svg-icon">
								<svg xmlns="http://www.w3.org/2000/svg">
									<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#cog-outline"}/>
								</svg>
							</em>
						</div>
					</div>
					<div className="langSelector">
						<em className="svg-icon">
							<svg xmlns="http://www.w3.org/2000/svg">
								<use xlinkHref={process.env.PUBLIC_URL + "/svg/sprite-icons.svg#translate"}/>
							</svg>
						</em>
						<Select
							placeholder={props.defaultLanguage}
							options={options}
							onChange={onLanguageChange}
							classNamePrefix = "select"
							theme = {
								theme => ({
									...theme,
									borderRadius: 5,
									colors: {
										...theme.colors,
										primary: '#333',
										primary25: '#00000033',
										primary50: '#00000077',
										primary75: '#000000aa',
									},
								})
							}
						/>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default nav;
