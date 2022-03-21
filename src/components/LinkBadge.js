import React from 'react'
import { Link } from 'react-router-dom'
import { cleanAndCapName, buildPathName, getUrlId } from '../scripts/helpers'

export function LinkBadges({ category, items }) {
	if (
		typeof items === 'object' &&
		!Array.isArray(items) &&
		items !== null
	) {
		const arr = []
		arr.push(items)
		items = arr
	}
	return (
		<h6>
			{items ? items.map((item) => (
				<Link
					key={item.name}
					className="mx-1"
					style={{ textDecoration: 'none' }}
					to={buildPathName(`/${category}/${getUrlId(item.url)}`)}
				>
					<span
						className="badge text-nowrap"
						style={{ backgroundColor: `#ef5350`, color: 'white' }}
					>
						{cleanAndCapName(item.name)}
					</span>
				</Link>
			)) : null}
		</h6>
	)
}