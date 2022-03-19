import React, { useState } from 'react'
import { capName, getUserLanguage } from '../../helpers'
import PokemonCard from '../cards/PokemonCard'
import TypeCard from '../cards/TypeCard'
import ItemCard from '../cards/ItemCard'

export default function SoftLockList({
	items = [],
	title = '',
	category = 'pokemon',
	pageLimit = 48,
	hidden = true,
}) {
	const userLanguage = getUserLanguage()

	const [isHidden, setIsHidden] = useState(hidden)

	return (
		<div className="row">
			<h5 className="text-center">{title}</h5>
			{isHidden ? (
				<input
					type="submit"
					value={`View ${capName(category)}`}
					className="btn btn-success mx-auto"
					style={{ width: 'auto' }}
					onClick={() => setIsHidden(false)}
				/>
			) : category === 'pokemon' ? (
				items.map((item) => (
					<PokemonCard key={item.name} name={item.name} url={item.url} />
				))
			) : category === 'type' ? (
				items.map((item) => (
					<TypeCard
						key={item.name}
						name={item.name}
						url={item.url}
						userLanguage={userLanguage}
					/>
				))
			) : (
				items.map((item) => (
					<ItemCard
						key={item.name}
						category={category}
						name={item.name}
						url={item.url}
					/>
				))
			)}
		</div>
	)
}
