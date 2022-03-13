import React, { useState } from 'react'
import PokemonCard from './PokemonCard'

export default function PokemonList({ pokemon }) {
	const [hidden, setHidden] = useState(true)

	return (
		<div className="row">
			{hidden ? (
				<input
					type="submit"
					value="View Pokemon"
					className="btn btn-success mx-auto"
					style={{ width: 'auto' }}
					onClick={() => setHidden(false)}
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
