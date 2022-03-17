import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { cleanAndCapName, getUserLanguage } from '../../helpers'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../../NotFound'

export default function Move() {
	let { index } = useParams()
	const userLanguage = getUserLanguage()

	const [notFound, setNotFound] = useState(false)
	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [pokemon, setPokemon] = useState([])

	useEffect(() => {
		const moveUrl = `${process.env.REACT_APP_POKE_API}/move/${index}/`

		Axios.get(moveUrl)
			.then((moveRes) => {
				const id = moveRes.data.id
				const name = moveRes.data.name.toLowerCase()

				let description = ''
				moveRes.data.flavor_text_entries.some((flavor) => {
					if (flavor.language.name === userLanguage) {
						description = flavor.flavor_text
						return
					}
				})

				const pokemon = moveRes.data.learned_by_pokemon

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
		<div className="col pb-4">
			{notFound && <NotFound />}
			<div className="card mb-5">
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
				<div className="col mb-5">
					<SoftLockList items={pokemon} title="Leaved By" category="pokemon" />
				</div>
			</div>
		</div>
	)
}
