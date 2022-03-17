import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios'
import {
	buildPathName,
	capName,
	cleanAndCapName,
	getUserLanguage,
	getUrlId,
} from '../../helpers'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../../NotFound'
import { TypeBadge } from '../type/Type'
import { TYPE_COLORS } from '../type/Type'

// const REACT_APP_POKE_API = process.env.REACT_APP_POKE_API

export default function Pokemon() {
	let { index } = useParams()
	const userLanguage = getUserLanguage()

	//const profileTitleWidth = 5
	const profileDataWidth = 7

	const [notFound, setNotFound] = useState(false)
	const [translatedName, setTranslatedName] = useState('')
	const [pokemonInfo, setPokemonInfo] = useState({
		id: '',
		name: '',
		imageUrls: [],
		types: [],
		abilities: [],
		moves: [],
		stats: {
			hp: '',
			attack: '',
			defense: '',
			speed: '',
			specialAttack: '',
			specialDefense: '',
		},
		height: '',
		weight: '',
		evs: '',
		themeColor: '',
	})
	const [speciesInfo, setSpeciesInfo] = useState({
		description: '',
		genderRatioMale: '',
		genderRatioFemale: '',
		catchRate: '',
		eggGroups: '',
		hatchSteps: '',
	})

	useEffect(() => {
		const pokemonUrl = `${process.env.REACT_APP_POKE_API}/pokemon/${index}/`
		const pokemonSpeciesUrl = `${process.env.REACT_APP_POKE_API}/pokemon-species/${index}/`

		Axios.get(pokemonUrl)
			.then((pokemonRes) => {
				const id = pokemonRes.data.id
				const name = pokemonRes.data.name.toLowerCase()
				const imageUrls = pokemonRes.data.sprites

				let { hp, attack, defense, speed, specialAttack, specialDefense } = ''

				pokemonRes.data.stats.map((stat) => {
					switch (stat.stat.name) {
						case 'hp':
							hp = stat['base_stat']
							break
						case 'attack':
							attack = stat['base_stat']
							break
						case 'defense':
							defense = stat['base_stat']
							break
						case 'speed':
							speed = stat['base_stat']
							break
						case 'special-attack':
							specialAttack = stat['base_stat']
							break
						case 'special-defense':
							specialDefense = stat['base_stat']
							break
						default:
							break
					}
				})

				// Convert Decimeters to Feet... The + 0.0001 * 100 ) / 100 is for rounding to two decimal places :)
				const height =
					Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100

				const weight =
					Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100

				const types = pokemonRes.data.types.map((type) => {
					// type.type.name.toLowerCase()
					const name = type.type.name
					const url = type.type.url
					return { name, url }
				})

				const themeColor = `${TYPE_COLORS[types[types.length - 1].name]}`

				const abilities = pokemonRes.data.abilities.map((ability) => {
					// return ability.ability.name
					const name = ability.ability.name
					const url = ability.ability.url
					return { name, url }
				})

				const moves = pokemonRes.data.moves.map((move) => {
					// return move.move.name
					const name = move.move.name
					const url = move.move.url
					return { name, url }
				})

				const evs = pokemonRes.data.stats
					.filter((stat) => {
						if (stat.effort > 0) {
							return true
						}
						return false
					})
					.map((stat) => {
						return `${stat.effort} ${cleanAndCapName(stat.stat.name)}`
					})
					.join(', ')

				// Get Pokemon Description .... Is from a different end point uggh
				Axios.get(pokemonSpeciesUrl).then((speciesRes) => {
					let translation = translatedName
					speciesRes.data.names.some((name) => {
						if (name.language.name === userLanguage) {
							translation = name.name
							return
						}
					})

					let description = ''
					speciesRes.data.flavor_text_entries.some((flavor) => {
						if (flavor.language.name === userLanguage) {
							description = flavor.flavor_text
							return
						}
					})
					const femaleRate = speciesRes.data['gender_rate']
					const genderRatioFemale = 12.5 * femaleRate
					const genderRatioMale = 12.5 * (8 - femaleRate)

					const catchRate = Math.round(
						(100 / 255) * speciesRes.data['capture_rate']
					)

					const eggGroups = speciesRes.data['egg_groups']
						.map((group) => {
							return cleanAndCapName(group.name)
						})
						.join(', ')

					const hatchSteps = 255 * (speciesRes.data['hatch_counter'] + 1)

					setTranslatedName(translation)
					setSpeciesInfo({
						description,
						genderRatioFemale,
						genderRatioMale,
						catchRate,
						eggGroups,
						hatchSteps,
					})
				})

				setTranslatedName(name)
				setPokemonInfo({
					id,
					name,
					imageUrls,
					types,
					abilities,
					moves,
					stats: {
						hp,
						attack,
						defense,
						speed,
						specialAttack,
						specialDefense,
					},
					height,
					weight,
					evs,
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
				<div className="card-header">
					<div className="row">
						<div className="col-4">
							<h5>
								{pokemonInfo.id} {/* capName(translatedName) */}
							</h5>
						</div>
						<div className="col-8">
							<h5 className="float-end" style={{ margin: '0' }}>
								{pokemonInfo.types.map((type) => (
									<TypeBadge key={type.name} name={type.name} url={type.url} />
								))}
							</h5>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-4 col-sm-5">
							<PokemonImage
								imageUrls={pokemonInfo.imageUrls}
								color={pokemonInfo.themeColor}
							/>
						</div>
						<div className="col-md-8 col-sm-7">
							<h4 className="mx-auto">{capName(translatedName)}</h4>
							<Stat
								title="HP"
								width={pokemonInfo.stats.hp}
								color={pokemonInfo.themeColor}
							/>
							<Stat
								title="Attack"
								width={pokemonInfo.stats.attack}
								color={pokemonInfo.themeColor}
							/>
							<Stat
								title="Defence"
								width={pokemonInfo.stats.defense}
								color={pokemonInfo.themeColor}
							/>
							<Stat
								title="Speed"
								width={pokemonInfo.stats.speed}
								color={pokemonInfo.themeColor}
							/>
							<Stat
								title="Sp Atk"
								width={pokemonInfo.stats.specialAttack}
								color={pokemonInfo.themeColor}
							/>
							<Stat
								title="Sp Def"
								width={pokemonInfo.stats.specialDefense}
								color={pokemonInfo.themeColor}
							/>
						</div>
					</div>
					<div className="row mt-1">
						<div className="col">
							<p className="">{speciesInfo.description}</p>
						</div>
					</div>
				</div>
				<hr />
				<div className="card-body">
					<h5 className="card-title text-center">Profile</h5>
					<div className="row">
						<div className="col-sm-6">
							<div className="row">
								<Profile title="Height" data={`${pokemonInfo.height} ft.`} />
								<Profile title="Weight" data={`${pokemonInfo.weight} lbs`} />
								<Profile
									title="Catch Rate"
									data={`${speciesInfo.catchRate}%`}
								/>
								<ProfileTitle title="Gender Ratio" />
								<div className={`col-${profileDataWidth}`}>
									<div className="progress">
										<div
											className="progress-bar"
											role="progressbar"
											style={{
												width: `${speciesInfo.genderRatioFemale}%`,
												backgroundColor: '#c2185b',
											}}
											aria-valuenow="15"
											aria-valuemin="0"
											aria-valuemax="100"
										>
											<small>{speciesInfo.genderRatioFemale}</small>
										</div>
										<div
											className="progress-bar"
											role="progressbar"
											style={{
												width: `${speciesInfo.genderRatioMale}%`,
												backgroundColor: '#1976d2',
											}}
											aria-valuenow="30"
											aria-valuemin="0"
											aria-valuemax="100"
										>
											<small>{speciesInfo.genderRatioMale}</small>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="row">
								<Profile title="Egg Groups" data={speciesInfo.eggGroups} />
								<Profile title="Hatch Steps" data={speciesInfo.hatchSteps} />
								<ProfileTitle title="Abilities" />
								<div className={`col-${profileDataWidth}`}>
									<h6>
										{pokemonInfo.abilities.map((ability) => (
											<Link
												key={ability.name}
												className="me-1"
												style={{ textDecoration: 'none' }}
												to={buildPathName(`/ability/${getUrlId(ability.url)}`)}
											>
												<span
													className="badge text-nowrap"
													style={{ backgroundColor: `#ef5350`, color: 'white' }}
												>
													{cleanAndCapName(ability.name)}
												</span>
											</Link>
										))}
									</h6>
								</div>
								<Profile title="EVs" data={pokemonInfo.evs} />
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
						items={pokemonInfo.moves}
						title="Learnable Moves"
						category="move"
					/>
				</div>
			</div>
		</div>
	)
}

function Stat({ title, width, color }) {
	return (
		<div className="row align-items-center">
			<StatTitle title={title} />
			<StatBar width={width} color={color} />
		</div>
	)
}
function StatTitle({ title }) {
	return <div className="col-md-3">{title}</div>
}
function StatBar({ width, color }) {
	return (
		<div className="col-md-9">
			<div className="progress">
				<div
					className="progress-bar "
					role="progressbar"
					style={{
						width: `${width}%`,
						backgroundColor: `#${color}`,
					}}
					aria-valuenow="25"
					aria-valuemin="0"
					aria-valuemax="100"
				>
					<small>{width}</small>
				</div>
			</div>
		</div>
	)
}

function Profile({ title, data }) {
	return (
		<>
			<ProfileTitle title={title} />
			<ProfileData data={data} />
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
function ProfileData({ data }) {
	return (
		<div className="col-7">
			<h6 className="float-start">{data}</h6>
		</div>
	)
}

function PokemonImage({ imageUrls, name = '', color }) {
	const [isFront, setIsFront] = useState(true)
	const [isFemale, setIsFemale] = useState(false)
	const [isShiny, setIsShiny] = useState(false)

	function pokemonImage(isFront, isFemale, isShiny) {
		if (!imageUrls) return

		if (isFront) {
			if (isFemale) {
				if (isShiny) {
					return imageUrls.front_shiny_female
				} else {
					return imageUrls.front_female
				}
			} else {
				if (isShiny) {
					return imageUrls.front_shiny
				} else {
					return imageUrls.front_default
				}
			}
		} else {
			if (isFemale) {
				if (isShiny) {
					return imageUrls.back_shiny_female
				} else {
					return imageUrls.back_female
				}
			} else {
				if (isShiny) {
					return imageUrls.back_shiny
				} else {
					return imageUrls.back_default
				}
			}
		}
	}

	return (
		<>
			<div className="row">
				<img
					src={pokemonImage(isFront, isFemale, isShiny)}
					alt={name}
					className="card-img-top rounded mx-auto mt-2"
				/>
			</div>
			<div className="row">
				<div className="col-4 px-1">
					<button
						type="button"
						className="btn btn-danger btn-sm w-100"
						style={{
							backgroundColor: `#${color}`,
							borderWidth: '0',
						}}
						disabled={!pokemonImage(!isFront, isFemale, isShiny)}
						onClick={(event) => {
							setIsFront(!isFront)
						}}
					>
						{isFront ? 'Front' : 'Back'}
					</button>
				</div>
				<div className="col-4 px-1">
					<button
						type="button"
						className="btn btn-danger btn-sm w-100"
						style={{
							backgroundColor: `#${color}`,
							borderWidth: '0',
						}}
						disabled={!pokemonImage(isFront, !isFemale, isShiny)}
						onClick={(event) => {
							setIsFemale(!isFemale)
						}}
					>
						{isFemale ? 'Female' : 'Male'}
					</button>
				</div>
				<div className="col-4 px-1">
					<button
						type="button"
						className="btn btn-danger btn-sm w-100"
						style={{
							backgroundColor: `#${color}`,
							borderWidth: '0',
						}}
						disabled={!pokemonImage(isFront, isFemale, !isShiny)}
						onClick={(event) => {
							setIsShiny(!isShiny)
						}}
					>
						{isShiny ? 'Shiny' : 'Default'}
					</button>
				</div>
			</div>
		</>
	)
}
