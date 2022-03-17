import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import useCookie from 'react-use-cookie'
import styled from 'styled-components'
import { homePathName, getUrlId } from '../../helpers'

const Branding = styled.a`
	-moz-user-select: none;
	-website-user-select: none;
	-ms-user-select: none;
	user-select: none;
	-o-user-select: none;
`

const Logo = styled.img`
	height: 30px;
	width: 30px;
	margin-right: 0.5em;
`

export default function NavBar() {
	const [hoverNavBar, setHoverNavBar] = useState(false)
	const [userLanguage, setUserLanguage] = useCookie('userLanguage', 'en')
	// const [languages, setLanguages] = useState([])
	const languages = ['en', 'ja-Hrkt', 'ko', 'fr', 'de', 'es']
	const [optionLoaded, setOptionLoaded] = useState('')

	// Similar to componentDidMount and componentDidUpdate
	useEffect(() => {
		window.addEventListener('scroll', updateHoverNavBar.bind(this), true)

		// const languageUrl = `${process.env.REACT_APP_POKE_API}/language/`

		// Axios.get(languageUrl).then((languageRes) => {
		// 	const languages = languageRes.data.results

		// 	setLanguages(languages)
		// })

		console.log("optionsLoaded = " + optionLoaded)

		// Similar to componentDidUnmount
		return () => {
			window.removeEventListener('scroll', updateHoverNavBar.bind(this), true)
		}
	}, [optionLoaded])

	function updateHoverNavBar() {
		window.scrollY <= 0 ? setHoverNavBar(false) : setHoverNavBar(true)
	}

	return (
		<nav
			className="navbar navbar-expand-md navbar-dark bg-dark fixed-top justify-content-between px-2"
			style={
				hoverNavBar
					? {
							boxShadow:
								'0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
							transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
							backgroundColor: '#ef5350 !important',
					  }
					: {
							backgroundColor: 'transparent !important',
					  }
			}
		>
			<Branding
				href={homePathName()}
				className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
			>
				<Logo src="./logo.svg" />
				{process.env.REACT_APP_WEBSITE_NAME}
			</Branding>
			<form className="form-inline">
				<select
					value={userLanguage}
					className="form-select"
					onChange={(event) => {
						console.log(`set language = ${event.target.value}`)
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
		</nav>
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
