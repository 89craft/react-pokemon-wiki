import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { getUserLanguage } from '../../scripts/helpers'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../layout/NotFound'

export default function Move() {
	let { index } = useParams()
	const userLanguage = getUserLanguage()

	const [notFound, setNotFound] = useState(false)
	// const [name, setName] = useState('')
	const [moveInfo, setMoveInfo] = useState({
		id: '',
		name: '',
		translatedName: '',
		description: '',
		pokemon: [],
	})

	useEffect(() => {
		const moveUrl = `${process.env.REACT_APP_POKE_API}/move/${index}/`

		Axios.get(moveUrl)
			.then((moveRes) => {
				const id = moveRes.data.id

				const name = moveRes.data.name.toLowerCase()
				let translatedName = name
				moveRes.data.names.some((name) => {
					if (name.language.name === userLanguage) {
						translatedName = name.name
						return
					}
				})

				let description = ''
				moveRes.data.flavor_text_entries.some((flavor) => {
					if (flavor.language.name === userLanguage) {
						description = flavor.flavor_text
						return
					}
				})

				const pokemon = moveRes.data.learned_by_pokemon

				// setName(name)
				setMoveInfo({
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
							<h5>
								{`${moveInfo.translatedName}`}
							</h5>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							{/* <h4 className="mx-auto">{moveInfo.translatedName}</h4> */}
						</div>
					</div>
					<div className="row mt-1">
						<div className="col">
							<p className="">{moveInfo.description}</p>
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
					<SoftLockList items={moveInfo.pokemon} title="Leaved By" category="pokemon" />
				</div>
			</div>
		</div>
	)
}
