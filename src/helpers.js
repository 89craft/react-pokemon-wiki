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
	if (getUserLanguage() !== 'en') return text
	text = text ? text : ''
	return text
		.toLowerCase()
		.split(' ')
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(' ')
}
// convert 'water-absorb' to 'Water Absorb'
export function cleanAndCapName(text) {
	if (getUserLanguage() !== 'en') return text
	text = text ? text : ''
	return text
		.toLowerCase()
		.split('-')
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(' ')
}
// convert 'water-absorb' or 'water absorb' to 'Water Absorb'
export function cleanOrCapName(text) {
	if (getUserLanguage() !== 'en') return text
	text = text ? text : ''
	const dashSplit = text.toLowerCase().split('-')
	if (dashSplit.length > 1) {
		return dashSplit
			.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			.join(' ')
	} else {
		return text
			.toLowerCase()
			.split(' ')
			.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			.join(' ')
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
