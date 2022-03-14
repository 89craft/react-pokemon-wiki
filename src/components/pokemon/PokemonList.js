import React, { useState } from 'react'
import PokemonCard from './PokemonCard'

export default function PokemonList({ pokemon = [], hidden = true }) {
	const [isHidden, setIsHidden] = useState(hidden)

	return (
		<div className="row">
			{isHidden ? (
				<input
					type="submit"
					value="View Pokemon"
					className="btn btn-success mx-auto"
					style={{ width: 'auto' }}
					onClick={() => setIsHidden(false)}
				/>
			) : (
				<>
					{pokemon.map((pokemon) => (
						<PokemonCard
							key={pokemon.name}
							name={pokemon.name}
							url={pokemon.url}
						/>
					))}
				</>
			)}
		</div>
	)
}
