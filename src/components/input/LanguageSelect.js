import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import useCookie from 'react-use-cookie'
import { getUrlId } from '../../scripts/helpers'

const languages = ['en', 'de', 'ja-Hrkt', 'ko', 'fr', 'es']

export default function LanguageSelect() {
	const [userLanguage, setUserLanguage] = useCookie('userLanguage', 'en')
	// const [languages, setLanguages] = useState([])
	const [optionLoaded, setOptionLoaded] = useState('')

	// Similar to componentDidMount and componentDidUpdate
	useEffect(() => {
		// const languageUrl = `${process.env.REACT_APP_POKE_API}/language/`

		// Axios.get(languageUrl).then((languageRes) => {
		// 	const languages = languageRes.data.results

		// 	setLanguages(languages)
		// })
	}, [optionLoaded])

	return (
		<form className="form-inline">
			<select
				value={userLanguage}
				className="form-select"
				onChange={(event) => {
					setUserLanguage(event.target.value)
					window.location.reload(false)
				}}
			>
				{languages.map((language) => (
					<LanguageOption
						key={language}
						userLanguage={userLanguage}
						name={language}
						setLoaded={setOptionLoaded}
					/>
				))}
			</select>
		</form>
	)
}

function LanguageOption({ userLanguage, name, url = '', setLoaded }) {
	const [translation, setTranslation] = useState('')

	useEffect(() => {
		const languageUrl = `${process.env.REACT_APP_POKE_API}/language/${
			url.length > 0 ? getUrlId(url) : name
		}`

		Axios.get(languageUrl).then((languageRes) => {
			let translation = ''
			languageRes.data.names.some((name) => {
				if (name.language.name === userLanguage) {
					translation = name.name
					return
				}
			})

			setTranslation(translation)

			setLoaded(name)
		})
	}, [])

	if (translation.length > 0) return <option value={name}>{translation}</option>
	else return <></>
}
