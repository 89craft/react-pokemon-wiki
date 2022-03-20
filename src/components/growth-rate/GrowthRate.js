import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import {
	cleanAndCapName,
	getUserLanguage,
	capFirstLetter,
} from '../../scripts/helpers'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../layout/NotFound'

export default function GrowthRate() {
	let { index } = useParams()
	const userLanguage = getUserLanguage()

	const [notFound, setNotFound] = useState(false)
	const [growthRateInfo, setgrowthRateInfo] = useState({
		id: '',
		name: '',
		description: '',
		formula: '',
		species: [],
	})

	useEffect(() => {
		const growthRateUrl = `${process.env.REACT_APP_POKE_API}/growth-rate/${index}/`

		Axios.get(growthRateUrl)
			.then((growthRateRes) => {
				const id = growthRateRes.data.id
				const name = growthRateRes.data.name.toLowerCase()

				let description = ''
				growthRateRes.data.descriptions.some((desc) => {
					if (desc.language.name === userLanguage) {
						description = desc.description
						return
					}
				})
				if (description.length < 1) {
					growthRateRes.data.descriptions.some((desc) => {
						if (desc.language.name === 'en') {
							description = desc.description
							return
						}
					})
				}

				const formula = growthRateRes.data.formula

				const species = growthRateRes.data.pokemon_species.map(
					(singleSpecies) => {
						const name = singleSpecies.name
						const url = singleSpecies.url
						return { name, url }
					}
				)

				setgrowthRateInfo({
					id,
					name,
					description,
					formula,
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
							<h5>{cleanAndCapName(growthRateInfo.name)}</h5>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							<h4 className="mx-auto">
								{cleanAndCapName(growthRateInfo.name)}
							</h4>
						</div>
					</div>
					<div className="row mt-1">
						<div className="col">
							<p>{capFirstLetter(growthRateInfo.description)}</p>
							<p>{`Formula: ${growthRateInfo.formula}`}</p>
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
						items={growthRateInfo.species}
						title="Pokemon"
						category="pokemon"
					/>
				</div>
			</div>
		</div>
	)
}
