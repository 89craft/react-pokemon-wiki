import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { cleanAndCapName, getUserLanguage, capFirstLetter } from '../../scripts/helpers'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../layout/NotFound'

export default function PokemonColor() {
	let { index } = useParams()
	const userLanguage = getUserLanguage()

	const [notFound, setNotFound] = useState(false)
	const [pokemonColorInfo, setpokemonColorInfo] = useState({
		id: '',
		name: '',
		translatedName: '',
		species: [],
	})

	useEffect(() => {
		const pokemonColorUrl = `${process.env.REACT_APP_POKE_API}/pokemon-color/${index}/`

		Axios.get(pokemonColorUrl)
			.then((pokemonColorRes) => {
				const id = pokemonColorRes.data.id

				let name = pokemonColorRes.data.name.toLowerCase()
				let translatedName = name
				pokemonColorRes.data.names.some((name) => {
					if (name.language.name === userLanguage) {
						translatedName = name.name
						return
					}
				})

				const species = pokemonColorRes.data.pokemon_species.map((singleSpecies) => {
					const name = singleSpecies.name
					const url = singleSpecies.url
					return { name, url }
				})

				setpokemonColorInfo({
					id,
					name,
					translatedName,
					species,
				})
			})
			.catch((err) => {
				setNotFound(true)
			})
	}, [index])

	return (
		<div className="col pb-4">
			{notFound && <NotFound />}
			<div className="card mb-5">
				<div className="card-header">
					<div className="row">
						<div className="col-6">
							<h5>{pokemonColorInfo.translatedName}</h5>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							<h4 className="mx-auto">{pokemonColorInfo.translatedName}</h4>
						</div>
					</div>
					{/* <div className="row mt-1">
						<div className="col">
							<p>{capFirstLetter(pokemonColorInfo.description)}</p>
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
				<div className="col mb-5">
					<SoftLockList
						items={pokemonColorInfo.species}
						title="Pokemon"
						category="pokemon"
					/>
				</div>
			</div>
		</div>
	)
}
