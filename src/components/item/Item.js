import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { cleanAndCapName, getUserLanguage } from '../../scripts/helpers'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../layout/NotFound'

export default function Item() {
	let { index } = useParams()
	const userLanguage = getUserLanguage()

	const [notFound, setNotFound] = useState(false)
	const [itemInfo, setitemInfo] = useState({
		id: '',
		name: '',
		translatedName: '',
		imageUrl: '',
		description: '',
		effect: '',
		effectShort: '',
	})

	useEffect(() => {
		const itemUrl = `${process.env.REACT_APP_POKE_API}/item/${index}/`

		Axios.get(itemUrl)
			.then((itemRes) => {
				const id = itemRes.data.id
				const imageUrl = itemRes.data.sprites.default

				let name = itemRes.data.name.toLowerCase()
				let translatedName = name
				itemRes.data.names.some((name) => {
					if (name.language.name === userLanguage) {
						translatedName = name.name
						return
					}
				})

				let description = ''
				itemRes.data.flavor_text_entries.some((flavor) => {
					if (flavor.language.name === userLanguage) {
						description = flavor.text
						return
					}
				})

				let effect = ''
				let effectShort = ''
				itemRes.data.effect_entries.some((singleEffect) => {
					if (singleEffect.language.name === userLanguage) {
						effect = singleEffect.effect
						effectShort = singleEffect.short_effect
						return
					}
				})
				if (description.length < 1) {
					itemRes.data.effect_entries.some((singleEffect) => {
						if (singleEffect.language.name === userLanguage) {
							effect = singleEffect.effect
							effectShort = singleEffect.short_effect
							return
						}
					})
				}

				setitemInfo({
					id,
					name,
					translatedName,
					imageUrl,
					description,
					effect,
					effectShort,
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
					<h5>{itemInfo.translatedName}</h5>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-4 col-sm-5">
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${itemInfo.name}.png`}
								alt={itemInfo.name}
								className="card-img-top rounded mx-auto mt-2"
								style={{ imageRendering: 'pixelated' }}
							/>
						</div>
						<div className="col-md-8 col-sm-7">
							<h4 className="mx-auto">{itemInfo.translatedName}</h4>
							<p className="mt-3">{itemInfo.description}</p>
							<i>{`Effect: ${itemInfo.effectShort}`}</i>
							<p>{`${itemInfo.effect}`}</p>
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
						items={itemInfo.species}
						title="Pokemon"
						category="pokemon"
					/>
				</div>
			</div>
		</div>
	)
}
