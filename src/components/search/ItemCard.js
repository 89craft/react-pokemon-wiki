import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { buildPathName, cleanAndCapName } from '../../helpers'
import { TYPE_COLORS } from '../type/Type'

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

export default function ItemCard({
	category = 'pokemon',
	name = '',
	url = '',
}) {
	const itemIndex = url.split('/')[url.split('/').length - 2]
	return (
		<div className="col-xl-2 col-lg-3 col-md-4 col-6 my-3">
			<StyledLink to={buildPathName(`/${category}/${itemIndex}`)}>
				{category === 'type' ? (
					<Card
						className="card"
						style={
							name in TYPE_COLORS
								? {
										backgroundColor: `#${TYPE_COLORS[name]}`,
										color: 'white',
								  }
								: null
						}
					>
						<h5 className="card-header">
							{itemIndex} {cleanAndCapName(name)}
						</h5>
					</Card>
				) : (
					<Card className="card">
						<h5 className="card-header">
							{itemIndex} {cleanAndCapName(name)}
						</h5>
					</Card>
				)}
			</StyledLink>
		</div>
	)
}
