import i18n from 'i18next'
import {initReactI18next} from "react-i18next";

import en_translation from './locales/en/en_translation.json'
import ta_translation from './locales/ta/ta_translation.json'

const resources = {
	en:{
		translation : en_translation
	},
	ta :{
		translation: ta_translation
	}
}

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: "ta",

		keySeparator: false, // we do not use keys in form messages.welcome

		interpolation: {
			escapeValue: false // react already safes from xss
		}
	});

export default i18n;