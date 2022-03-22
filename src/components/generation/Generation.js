import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios'
import {
	buildPathName,
	cleanAndCapName,
	getUrlId,
	getUserLanguage,
} from '../../scripts/helpers'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../layout/NotFound'

export default function Generation() {
	let { index } = useParams()
	const userLanguage = getUserLanguage()

	const [notFound, setNotFound] = useState(false)
	const [generationInfo, setgenerationInfo] = useState({
		id: '',
		name: '',
		translatedName: '',
		// abilities: [],
		moves: [],
		species: [],
		types: [],
		versionGroups: [],
	})

	useEffect(() => {
		const generationUrl = `${process.env.REACT_APP_POKE_API}/generation/${index}/`

		Axios.get(generationUrl)
			.then((generationRes) => {
				const id = generationRes.data.id

				let name = generationRes.data.name.toLowerCase()
				let translatedName = name
				generationRes.data.names.some((name) => {
					if (name.language.name === userLanguage) {
						translatedName = name.name
						return
					}
				})

				// const abilities = generationRes.data.abilities

				const moves = generationRes.data.moves

				let species = generationRes.data.pokemon_species
				species.sort((a, b) => {
					const aID = Number(getUrlId(a.url))
					const bID = Number(getUrlId(b.url))
					if (aID < bID) return -1
					if (aID > bID) return 1
					return 0
				})

				const types = generationRes.data.types

				const versionGroups = generationRes.data.version_groups

				setgenerationInfo({
					id,
					name,
					translatedName,
					// abilities,
					moves,
					species,
					types,
					versionGroups,
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
					<h5>{generationInfo.translatedName}</h5>
				</div>
				<div className="card-body">
					{/* <div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							<h4 className="mx-auto">{generationInfo.translatedName}</h4>
						</div>
					</div> */}
					{/* <div className="row mt-1">
						<div className="col">
							<p>{generationInfo.description}</p>
						</div>
					</div> */}
					<div className="row mt-1">
						<div className="col">
							<h5>
								{generationInfo.versionGroups.map((versionGroup) => (
									<Link
										key={versionGroup.name}
										className="mx-1"
										style={{ textDecoration: 'none' }}
										to={buildPathName(
											`/version-group/${getUrlId(versionGroup.url)}`
										)}
									>
										<span
											className="badge text-nowrap"
											style={{ backgroundColor: `#ef5350`, color: 'white' }}
										>
											{cleanAndCapName(versionGroup.name)}
										</span>
									</Link>
								))}
							</h5>
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
						items={generationInfo.species}
						title="Pokemon"
						category="pokemon"
					/>
				</div>
			</div>
			{/* <div className="row">
				<div className="col mb-5">
					<SoftLockList
						items={generationInfo.abilities}
						title="Abilities"
						category="ability"
					/>
				</div>
			</div> */}
			<div className="row">
				<div className="col mb-5">
					<SoftLockList
						items={generationInfo.moves}
						title="Moves"
						category="move"
					/>
				</div>
			</div>
			<div className="row">
				<div className="col mb-5">
					<SoftLockList
						items={generationInfo.types}
						title="Types"
						category="type"
					/>
				</div>
			</div>
		</div>
	)
}
