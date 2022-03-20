import { getCookie } from 'react-use-cookie'

export function isProduction() {
	// process.env.NODE_ENV !== 'production'
	return process.env.NODE_ENV && process.env.NODE_ENV !== 'development'
}

export function buildPathName(path) {
	path = path ? path : ''
	/* if (isProduction()) return `../${process.env.REACT_APP_NAME}${path}`
	else */ return `../${path}`
}
export function homePathName() {
	if (isProduction()) return `/${process.env.REACT_APP_NAME}/`
	else return `/`
}

// convert 'water-absorb' to 'water absorb'
export function cleanName(text) {
	text = text ? text : ''
	return text.toLowerCase().split('-').join(' ')
}
// convert 'water absorb' to 'Water Absorb'
export function capName(text) {
	let newText = text ? text : ''
	newText = newText
		.toLowerCase()
		.split(' ')
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(' ')
	return newText.length > 0 ? newText : text
}
// convert 'water-absorb' to 'Water Absorb'
export function cleanAndCapName(text) {
	let newText = text ? text : ''
	newText = newText
		.toLowerCase()
		.split('-')
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(' ')
	let fallbackText = cleanName(text)
	return newText.length > 0
		? newText
		: fallbackText.length > 0
		? fallbackText
		: text
}
// convert 'water-absorb' or 'water absorb' to 'Water Absorb'
export function cleanOrCapName(text) {
	let newText = text ? text : ''
	let dashSplit = newText.toLowerCase().split('-')
	if (dashSplit.length > 1) {
		newText = dashSplit
			.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			.join(' ')
		return newText.length > 0 ? newText : text
	} else {
		newText = newText
			.toLowerCase()
			.split(' ')
			.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			.join(' ')
		return newText.length > 0 ? newText : text
	}
}

export function getUserLanguage() {
	let userLanguage = getCookie('userLanguage')
	if (!userLanguage || userLanguage.length < 1) userLanguage = 'en'
	return userLanguage
}

export function getUrlId(url) {
	// Number.isInteger(value)
	return url.split('/')[url.split('/').length - 2]
}
