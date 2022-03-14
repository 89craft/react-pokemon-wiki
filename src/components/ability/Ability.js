import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import PokemonList from '../pokemon/PokemonList'
import NotFound from '../../NotFound'

export default function Ability() {
	let { index } = useParams()

	const [notFound, setNotFound] = useState(false)

	const [name, setName] = useState('')
	const [pokemon, setPokemon] = useState([])

	useEffect(() => {
		const abilityUrl = `${process.env.REACT_APP_POKE_API}/ability/${index}/`

		Axios.get(abilityUrl)
			.then((abilityRes) => {
				const name = abilityRes.data.name
				const pokemon = abilityRes.data.pokemon.map((pokemon) => {
					const name = pokemon.pokemon.name
					const url = pokemon.pokemon.url
					return { name, url }
				})

				setName(name)
				setPokemon(pokemon)
			})
			.catch((err) => {
				setNotFound(true)
			})
	}, [])

	return (
		<div className="col">
			{notFound && <NotFound />}
			<div className="card">
				<div className="card-header">
					<div className="row">
						<div className="col-6">
							<h5>
								{index}{' '}
								{/* name
                  .toLowerCase()
                  .split(' ')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ') */}
							</h5>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							<h4 className="mx-auto">
								{name
									.toLowerCase()
									.split(' ')
									.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
									.join(' ')}
							</h4>
						</div>
					</div>
					{/* <div className="row mt-1">
            <div className="col">
              <p className="">{description}</p>
            </div>
          </div> */}
				</div>
				<div className="card-footer text-muted">
					Data From{' '}
					<a
						href="https://pokeapi.co/"
						target="_blank"
						rel="noopener noreferrer"
						className="card-link"
					>
						PokeAPI.co
					</a>
				</div>
			</div>
			<div className="row">
				<div className="col py-5">
					<PokemonList pokemon={pokemon} />
				</div>
			</div>
		</div>
	)
}
