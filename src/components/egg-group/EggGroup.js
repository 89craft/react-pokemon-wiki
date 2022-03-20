import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { getUserLanguage } from '../../scripts/helpers'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../layout/NotFound'

export default function EggGroup() {
	let { index } = useParams()
	const userLanguage = getUserLanguage()

	const [notFound, setNotFound] = useState(false)
	const [eggGroupInfo, seteggGroupInfo] = useState({
		id: '',
		name: '',
		translatedName: '',
		species: [],
	})

	useEffect(() => {
		const eggGroupUrl = `${process.env.REACT_APP_POKE_API}/egg-group/${index}/`

		Axios.get(eggGroupUrl)
			.then((eggGroupRes) => {
				const id = eggGroupRes.data.id

				let name = eggGroupRes.data.name.toLowerCase()
				let translatedName = name
				eggGroupRes.data.names.some((name) => {
					if (name.language.name === userLanguage) {
						translatedName = name.name
						return
					}
				})

				const species = eggGroupRes.data.pokemon_species.map((singleSpecies) => {
					const name = singleSpecies.name
					const url = singleSpecies.url
					return { name, url }
				})

				seteggGroupInfo({
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
					<h5>{eggGroupInfo.translatedName}</h5>
				</div>
				{/* <div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							<h4 className="mx-auto">{eggGroupInfo.translatedName}</h4>
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
						items={eggGroupInfo.species}
						title="Pokemon"
						category="pokemon"
					/>
				</div>
			</div>
		</div>
	)
}
