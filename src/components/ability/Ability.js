import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import {
	cleanName,
	cleanAndCapName,
	capFirstLetter,
	getUserLanguage,
} from '../../scripts/helpers'
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
		generation: {name: '', url: ''},
		effect: '',
		effectShort: '',
		effectChanges: [],
	})

	useEffect(() => {
		const abilityUrl = `${process.env.REACT_APP_POKE_API}/ability/${index}/`

		Axios.get(abilityUrl)
			.then((abilityRes) => {
				const id = abilityRes.data.id
				const generation = abilityRes.data.generation

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

				let effect = ''
				let effectShort = ''
				abilityRes.data.effect_entries.some((singleEffect) => {
					if (singleEffect.language.name === userLanguage) {
						effect = singleEffect.effect
						effectShort = singleEffect.short_effect
						return
					}
				})
				if (description.length < 1) {
					abilityRes.data.effect_entries.some((singleEffect) => {
						if (singleEffect.language.name === userLanguage) {
							effect = singleEffect.effect
							effectShort = singleEffect.short_effect
							return
						}
					})
				}

				let effectChanges = abilityRes.data.effect_changes.map((change) => {
					const name = change.version_group.name
					const url = change.version_group.url

					let effect = ''
					change.effect_entries.some((change) => {
						if (change.language.name === userLanguage) {
							effect = change.effect
							return
						}
					})
					if (description.length < 1) {
						change.some((change) => {
							if (change.language.name === 'en') {
								effect = change.effect
								return
							}
						})
					}

					return { name, url, effect }
				})

				setAbilityInfo({
					id,
					name,
					translatedName,
					description,
					pokemon,
					generation,
					effect,
					effectShort,
					effectChanges,
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
							<h5>{abilityInfo.translatedName}</h5>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							<h4 className="mx-auto">{abilityInfo.translatedName}</h4>
						</div>
					</div>
					<div className="row mt-1">
						<div className="col">
							<i>{`${capFirstLetter(cleanName(abilityInfo.generation.name))}`}</i>
							<p>{abilityInfo.description}</p>
							<i>{`Effect: ${abilityInfo.effectShort}`}</i>
							<p>{`${abilityInfo.effect}`}</p>
							{abilityInfo.effectChanges.map((change) => (
								<div key={change.name}>
									<i>{`Change: ${cleanAndCapName(change.name)}`}</i>
									<p>{`${change.effect}`}</p>
								</div>
							))}
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
