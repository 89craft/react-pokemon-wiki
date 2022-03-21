import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios'
import {
	getUserLanguage,
	getUrlId,
	buildPathName,
	cleanAndCapName,
} from '../../scripts/helpers'
import { TypeBadge, TYPE_COLORS } from '../type/Type'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../layout/NotFound'
// import { LinkBadges } from '../LinkBadge'

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
		accuracy: '',
		power: '',
		pp: '',
		damageClass: {},
		generation: {},
		target: {},
		type: {},
		contestType: {},
		contestComboBefore: [],
		contestComboAfter: [],
		effect: '',
		effectShort: '',
		themeColor: '',
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
				const accuracy = moveRes.data.accuracy
				const power = moveRes.data.power
				const pp = moveRes.data.pp
				const damageClass = moveRes.data.damage_class
				const generation = moveRes.data.generation
				const target = moveRes.data.target
				const type = moveRes.data.type
				const contestType = moveRes.data.contest_type

				const themeColor = `${TYPE_COLORS[type.name]}`

				// setName(name)
				setMoveInfo({
					id,
					name,
					translatedName,
					description,
					pokemon,
					accuracy,
					power,
					pp,
					damageClass,
					generation,
					target,
					type,
					contestType,
					themeColor,
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
				<div
					className="card-header"
					style={
						moveInfo.themeColor.length > 0
							? {
									backgroundColor: `#${moveInfo.themeColor}`,
									color: 'white',
							  }
							: {
									backgroundColor: `#222222`,
									color: 'white',
							  }
					}
				>
					<h5>{moveInfo.translatedName}</h5>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							<h4 className="mx-auto">{moveInfo.translatedName}</h4>
						</div>
					</div>
					<div className="row mt-1">
						<div className="col">
							<p>{moveInfo.description}</p>
						</div>
					</div>
				</div>
				<hr className="mt-0" />
				<div className="card-body">
					{/* <h5 className="card-title text-center">Profile</h5> */}
					<div className="row">
						<div className="col-sm-6">
							<div className="row">
								<Profile title="Accuracy" data={moveInfo.accuracy} />
								<Profile title="PP" data={moveInfo.pp} />
								<Profile title="Damage Class">
									<LinkBadges
										category="move-damage-class"
										items={moveInfo.damageClass}
									/>
								</Profile>
								<Profile title="Target">
									<LinkBadges category="move-target" items={moveInfo.target} />
								</Profile>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="row">
								<Profile title="Power" data={moveInfo.accuracy} />
								<Profile title="Generation">
									<LinkBadges
										category="generation"
										items={moveInfo.generation}
									/>
								</Profile>
								<Profile title="Type">
									<h6>
										<TypeBadge
											name={moveInfo.type.name}
											url={moveInfo.type.url}
											userLanguage={userLanguage}
										/>
									</h6>
								</Profile>
								<Profile title="Contest Type">
									<LinkBadges
										category="contest-type"
										items={moveInfo.contestType}
									/>
								</Profile>
							</div>
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
						items={moveInfo.pokemon}
						title="Learned By"
						category="pokemon"
					/>
				</div>
			</div>
		</div>
	)
}

function Profile({ children, title, data }) {
	return (
		<>
			<ProfileTitle title={title} />
			<ProfileData data={data}>{children}</ProfileData>
		</>
	)
}
function ProfileTitle({ title }) {
	return (
		<div className="col-5">
			<h6 className="float-end text-end text-nowrap">{title}:</h6>
		</div>
	)
}
function ProfileData({ children, data }) {
	return (
		<div className="col-7">
			{children ? <>{children}</> : <h6 className="float-start">{data}</h6>}
		</div>
	)
}

function LinkBadges({ category, items }) {
	if (typeof items === 'object' && !Array.isArray(items) && items !== null) {
		const arr = []
		arr.push(items)
		items = arr
	}
	return (
		<h6>
			{items[0].url
				? items.map((item) => (
						<Link
							key={item.name}
							className="mx-1"
							style={{ textDecoration: 'none' }}
							to={buildPathName(`/${category}/${getUrlId(item.url)}`)}
						>
							<span
								className="badge text-nowrap"
								style={{ backgroundColor: `#ef5350`, color: 'white' }}
							>
								{cleanAndCapName(item.name)}
							</span>
						</Link>
				  ))
				: null}
		</h6>
	)
}
