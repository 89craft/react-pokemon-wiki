import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { cleanAndCapName, getUserLanguage, capFirstLetter } from '../../scripts/helpers'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../layout/NotFound'

export default function PokemonShape() {
	let { index } = useParams()
	const userLanguage = getUserLanguage()

	const [notFound, setNotFound] = useState(false)
	const [pokemonShapeInfo, setpokemonShapeInfo] = useState({
		id: '',
		name: '',
		translatedName: '',
		species: [],
	})

	useEffect(() => {
		const pokemonShapeUrl = `${process.env.REACT_APP_POKE_API}/pokemon-shape/${index}/`

		Axios.get(pokemonShapeUrl)
			.then((pokemonShapeRes) => {
				const id = pokemonShapeRes.data.id

				let name = pokemonShapeRes.data.name.toLowerCase()
				let translatedName = name
				pokemonShapeRes.data.names.some((name) => {
					if (name.language.name === userLanguage) {
						translatedName = name.name
						return
					}
				})

				const species = pokemonShapeRes.data.pokemon_species.map((singleSpecies) => {
					const name = singleSpecies.name
					const url = singleSpecies.url
					return { name, url }
				})

				setpokemonShapeInfo({
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
					<h5>{pokemonShapeInfo.translatedName}</h5>
				</div>
				{/* <div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							<h4 className="mx-auto">{pokemonShapeInfo.translatedName}</h4>
						</div>
					</div>
				</div> */}
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
						items={pokemonShapeInfo.species}
						title="Pokemon"
						category="pokemon"
					/>
				</div>
			</div>
		</div>
	)
}
