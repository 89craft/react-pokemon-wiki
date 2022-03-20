import React, { useState } from 'react'
import {
	capName,
	cleanAndCapName,
	getUserLanguage,
} from '../../scripts/helpers'
import { getCookie } from 'react-use-cookie'
import PokemonCard from '../cards/PokemonCard'
import TypeCard from '../cards/TypeCard'
import ItemCard from '../cards/ItemCard'
import DefaultCard from '../cards/DefaultCard'

export default function SoftLockList({
	items = [],
	title = '',
	category = 'pokemon',
	pageLimit,
	hidden = true,
}) {
	if (!pageLimit) pageLimit = getCookie('pageLimit')
	const userLanguage = getUserLanguage()

	const [isHidden, setIsHidden] = useState(hidden)
	const [curPageLimit, setCurPageLimit] = useState(pageLimit)

	function incrementPageLimit() {
		setCurPageLimit(+curPageLimit + +pageLimit) // + makes it do math
	}

	return (
		<div className="row">
			<h4
				className="text-center"
				onClick={() => {
					setIsHidden(true)
				}}
			>
				{title}
			</h4>
			{isHidden ? (
				<input
					type="submit"
					value={`View ${cleanAndCapName(category)}`}
					className="btn btn-success mx-auto"
					style={{ width: 'auto' }}
					onClick={() => setIsHidden(false)}
				/>
			) : (
				<>
					{category === 'pokemon' ? (
						<>
							{items.slice(0, curPageLimit).map((item) => (
								<PokemonCard key={item.name} name={item.name} url={item.url} />
							))}
							{curPageLimit < items.length && (
								<input
									type="submit"
									value={`More ${title}`}
									className="btn btn-success mx-auto"
									style={{ width: 'auto' }}
									onClick={incrementPageLimit}
								/>
							)}
						</>
					) : category === 'type' ? (
						items.map((item) => (
							<TypeCard
								key={item.name}
								name={item.name}
								url={item.url}
								userLanguage={userLanguage}
							/>
						))
					) : category === 'item' ? (
						items.map((item) => (
							<ItemCard key={item.name} name={item.name} url={item.url} />
						))
					) : (
						items.map((item) => (
							<DefaultCard
								key={item.name}
								category={category}
								name={item.name}
								url={item.url}
							/>
						))
					)}
				</>
			)}
		</div>
	)
}
