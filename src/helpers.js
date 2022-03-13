export function isProduction() {
	// process.env.NODE_ENV !== 'production'
	return process.env.NODE_ENV && process.env.NODE_ENV !== 'development'
}

export function buildPathName(path) {
	let newPath = path ? path : ''

	if (isProduction()) {
		/* while (newPath.startsWith('.')) newPath.substr(1, newPath.length)

		if (!newPath.startsWith('/react-pokemon-wiki'))
			newPath = `/react-pokemon-wiki${newPath}`

		if (!newPath.startsWith('..')) newPath = `..${newPath}` */

		return `../react-pokemon-wiki${newPath}`
	} else {
		/* if (!newPath.startsWith('..')) newPath = `..${newPath}` */

		return `..${newPath}`
	}
}
