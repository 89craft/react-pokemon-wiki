import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { cleanAndCapName, getUserLanguage } from '../../scripts/helpers'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../layout/NotFound'

export default function Ability() {
	let { index } = useParams()
	const userLanguage = getUserLanguage()

	const [notFound, setNotFound] = useState(false)
	const [abilityInfo, setAbilityInfo] = useState({
		id: '',
		name: '',
		translatedName: '',
		description: '',
		pokemon: [],
	})

	useEffect(() => {
		const abilityUrl = `${process.env.REACT_APP_POKE_API}/ability/${index}/`

		Axios.get(abilityUrl)
			.then((abilityRes) => {
				const id = abilityRes.data.id

				let name = abilityRes.data.name.toLowerCase()
				let translatedName = name
				abilityRes.data.names.some((name) => {
					if (name.language.name === userLanguage) {
						translatedName = name.name
						return
					}
				})

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

				// setId(id)
				// setName(name)
				// setDescription(description)
				// setPokemon(pokemon)

				setAbilityInfo({
					id,
					name,
					translatedName,
					description,
					pokemon,
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
							<h5>{`${abilityInfo.translatedName}`}</h5>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							{/* <h4 className="mx-auto">{abilityInfo.translatedName}</h4> */}
						</div>
					</div>
					<div className="row mt-1">
						<div className="col">
							<p className="">{abilityInfo.description}</p>
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
				<div className="col mb-5">
					<SoftLockList
						items={abilityInfo.pokemon}
						title="Pokemon"
						category="pokemon"
					/>
				</div>
			</div>
		</div>
	)
}
