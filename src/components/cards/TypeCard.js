import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
	buildPathName,
	getUrlId,
	getUserLanguage,
} from '../../helpers'
import { TYPE_COLORS, TYPE_NAMES } from '../type/Type'

const Card = styled.div`
	opacity: 0.95;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	&:hover {
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	}
	-moz-user-select: none;
	-website-user-select: none;
	-ms-user-select: none;
	user-select: none;
	-o-user-select: none;
`

const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;

	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
`

export default function TypeCard({ name, url, userLanguage = 'en' }) {
	const itemId = getUrlId(url)

	function getTranslatedName(name, userLanguage) {
		if (!name) return name

		const set = TYPE_NAMES.find((entry) => {
			if (entry.name === name) return entry
		})

		let translatedName = name
		set.names.some((name) => {
			if (name.language.name === userLanguage) {
				translatedName = name.name
				return
			}
		})
		return translatedName
	}

	return TYPE_COLORS[name] ? (
		<div className="col-xl-2 col-lg-3 col-md-4 col-6 my-3">
			<StyledLink to={buildPathName(`/type/${itemId}`)}>
				<Card
					className="card"
					style={{
						backgroundColor: `#${TYPE_COLORS[name]}`,
						color: 'white',
					}}
				>
					<h5 className="card-header">
						{itemId}{' '}
						{getTranslatedName(
							name,
							userLanguage ? userLanguage : getUserLanguage()
						)}
					</h5>
				</Card>
			</StyledLink>
		</div>
	) : null
}
