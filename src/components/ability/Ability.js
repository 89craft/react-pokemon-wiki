import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { cleanAndCapName, getUserLanguage } from '../../helpers'
import PokemonList from '../lists/SoftLockList'
import NotFound from '../../NotFound'

export default function Ability() {
	let { index } = useParams()
	const userLanguage = getUserLanguage()

	const [notFound, setNotFound] = useState(false)
	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [pokemon, setPokemon] = useState([])

	useEffect(() => {
		const abilityUrl = `${process.env.REACT_APP_POKE_API}/ability/${index}/`

		Axios.get(abilityUrl)
			.then((abilityRes) => {
				const id = abilityRes.data.id
				const name = abilityRes.data.name.toLowerCase()

				let description = ''
				abilityRes.data.flavor_text_entries.some((flavor) => {
					if (flavor.language.name === userLanguage) {
						description = flavor.flavor_text
						return
					}
				})

				const pokemon = abilityRes.data.pokemon.map((pokemon) => {
					const name = pokemon.pokemon.name
					const url = pokemon.pokemon.url
					return { name, url }
				})

				setId(id)
				setName(name)
				setDescription(description)
				setPokemon(pokemon)
			})
			.catch((err) => {
				setNotFound(true)
			})
	}, [index])

	return (
		<div className="col">
			{notFound && <NotFound />}
			<div className="card">
				<div className="card-header">
					<div className="row">
						<div className="col-6">
							<h5>
								{id} {/* {cleanAndCapName(name)} */}
							</h5>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							<h4 className="mx-auto">{cleanAndCapName(name)}</h4>
						</div>
					</div>
					<div className="row mt-1">
						<div className="col">
							<p className="">{description}</p>
						</div>
					</div>
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
