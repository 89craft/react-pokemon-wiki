import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { capName } from '../../helpers'
import PokemonList from '../pokemon/PokemonList'
import NotFound from '../../NotFound'

export const TYPE_COLORS = {
	bug: 'a8b820',
	dark: '705848',
	dragon: '7038f8',
	electric: 'f8d030',
	fairy: 'f0b6bc',
	fighting: 'c03028',
	fire: 'f08030',
	flying: 'a890f0',
	ghost: '705898',
	grass: '78c850',
	ground: 'e0c068',
	ice: '98d8d8',
	normal: 'a8a878',
	poison: 'a040a0',
	psychic: 'f85888',
	rock: 'b8a038',
	steel: 'b8b8d0',
	water: '6890f0',
	/* bug: 'B1C12E',
	dark: '4F3A2D',
	dragon: '755EDF',
	electric: 'FCBC17',
	fairy: 'F4B1F4',
	fighting: '823551D',
	fire: 'E73B0C',
	flying: 'A3B3F7',
	ghost: '6060B2',
	grass: '74C236',
	ground: 'D3B357',
	ice: 'A3E7FD',
	normal: 'C8C4BC',
	poison: '934594',
	psychic: 'ED4882',
	rock: 'B9A156',
	steel: 'B5B5C3',
	water: '3295F6', */
}

export default function Type() {
	let { index } = useParams()
	let userLanguage = 'en'

	const [notFound, setNotFound] = useState(false)

	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [pokemon, setPokemon] = useState([])

	useEffect(() => {
		const typeUrl = `${process.env.REACT_APP_POKE_API}/type/${index}/`

		Axios.get(typeUrl)
			.then((typeRes) => {
				const id = typeRes.data.id
				const name = typeRes.data.name.toLowerCase()

				const pokemon = typeRes.data.pokemon.map((pokemon) => {
					const name = pokemon.pokemon.name
					const url = pokemon.pokemon.url
					return { name, url }
				})

				setId(id)
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
				<div
					className="card-header"
					style={{
						backgroundColor: `#${TYPE_COLORS[name]}`,
						color: 'white',
					}}
				>
					<div className="row">
						<div className="col-6">
							<h5>
								{id} {/* capName(name) */}
							</h5>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							<h4 className="mx-auto">{capName(name)}</h4>
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
