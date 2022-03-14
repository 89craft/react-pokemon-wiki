export function isProduction() {
	// process.env.NODE_ENV !== 'production'
	return process.env.NODE_ENV && process.env.NODE_ENV !== 'development'
}

export function buildPathName(path) {
	let newPath = path ? path : ''

	if (isProduction()) {
		/* while (newPath.startsWith('.')) newPath.substr(1, newPath.length)

		if (!newPath.startsWith('/${process.env.REACT_APP_NAME}'))
			newPath = `/${process.env.REACT_APP_NAME}${newPath}`

		if (!newPath.startsWith('..')) newPath = `..${newPath}` */

		return `../${process.env.REACT_APP_NAME}${newPath}`
	} else {
		/* if (!newPath.startsWith('..')) newPath = `..${newPath}` */

		return `../${newPath}`
	}
}
export function homePathName() {
	if (isProduction()) return `/${process.env.REACT_APP_NAME}/`
	else return `/`
}
