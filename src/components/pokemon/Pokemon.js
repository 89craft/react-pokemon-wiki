import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios'
import {
	buildPathName,
	capName,
	cleanAndCapName,
	getUserLanguage,
	getUrlId,
} from '../../scripts/helpers'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../layout/NotFound'
import { TypeBadge, TYPE_COLORS } from '../type/Type'
import { blend } from '../../scripts/blend'
import { RGBtoHSV, HSVtoRGB, parseHexString, createHexString } from '../../scripts/hsv'

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
			hp: 0,
			attack: 0,
			defense: 0,
			speed: 0,
			specialAttack: 0,
			specialDefense: 0,
		},
		heightCentMeters: 0,
		heightFeet: 0,
		heightInches: 0,
		weightKilos: 0,
		weightPounds: 0,
		evs: '',
		priThemeColor: '',
		secThemeColor: '',
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

		Axios.get(pokemonUrl)
			.then((pokemonRes) => {
				const pokemonSpeciesUrl = `${
					process.env.REACT_APP_POKE_API
				}/pokemon-species/${getUrlId(pokemonRes.data.species.url)}/`

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

				const heightCentMeters = pokemonRes.data.height * 10
				let heightFeet = Math.floor(pokemonRes.data.height / 3.048)
				let heightInches = Math.round(pokemonRes.data.height * 3.937)
				if (heightInches - heightFeet * 12 >= 12) {
					heightFeet += 1
					// heightInches -= 12
				}

				const weightKilos = (pokemonRes.data.weight / 10).toFixed(1)
				const weightPounds = (pokemonRes.data.weight / 4.536).toFixed(1)

				const types = pokemonRes.data.types.map((type) => {
					const name = type.type.name
					const url = type.type.url
					return { name, url }
				})

				const priThemeColor = `${TYPE_COLORS[types[0].name]}`
				const secThemeColor = `${TYPE_COLORS[types[types.length - 1].name]}`
				// let temp = changeColor(priThemeColor, 0, 0)
				// console.log(`%cpri 0 0 --- ${temp}`, `background: #${temp}; color: #fff`)

				const abilities = pokemonRes.data.abilities.map((ability) => {
					const name = ability.ability.name
					const url = ability.ability.url
					return { name, url }
				})

				const moves = pokemonRes.data.moves.map((move) => {
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
				Axios.get(pokemonSpeciesUrl)
					.then((speciesRes) => {
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
						const genderRatioFemale = femaleRate >= 0 ? 12.5 * femaleRate : 0
						const genderRatioMale =
							femaleRate >= 0 ? 12.5 * (8 - femaleRate) : 0

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
					.catch((err) => {
						console.log(err)
						setNotFound(true)
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
					heightCentMeters,
					heightFeet,
					heightInches,
					weightKilos,
					weightPounds,
					evs,
					priThemeColor,
					secThemeColor,
				})
			})
			.catch((err) => {
				console.log(err)
				setNotFound(true)
			})
	}, [index])

	function changeColor(color, deltaSat, deltaVal) {
		if (!color) return color

		console.log('------')
		let hsv = RGBtoHSV(parseHexString(color))
		// console.log(`rgb before ${color} ~ ${deltaSat} ~ ${deltaVal}`)
		console.log(
			`%chsv before ${hsv} ~ ${deltaSat} ~ ${deltaVal}`,
			`background: #${color}; color: #fff`
		)

		if (deltaSat > 0) {
			hsv[1] = hsv[1] + (1 - hsv[1]) * deltaSat
		} else if (deltaSat < 0) {
			hsv[1] = hsv[1] * (1 + deltaSat)
		}
		if (deltaVal > 0) {
			hsv[2] = hsv[2] + (255 - hsv[2]) * deltaVal
		} else if (deltaVal < 0) {
			hsv[2] = hsv[2] * (1 + deltaVal)
		}
		hsv[1] = hsv[1].toFixed(1)
		hsv[2] = Math.round(hsv[2])

		const rgb = createHexString(HSVtoRGB(hsv))
		console.log(`%chsv after ${hsv}`, `background: #${rgb}; color: #fff`)
		// console.log(`rgb after ${rgb}`)
		return rgb
	}

	return (
		<div className="col pb-4">
			{notFound && <NotFound />}
			<div className="card mb-5">
				<div
					className="card-header"
					style={
						pokemonInfo.secThemeColor.length > 0
							? {
									backgroundColor: `#${pokemonInfo.secThemeColor}`,
									color: 'white',
							  }
							: {
									backgroundColor: `#222222`,
									color: 'white',
							  }
					}
				>
					<div className="row">
						<div className="col-6">
							<h5 className="mb-0">
								{`#${pokemonInfo.id} - ${cleanAndCapName(translatedName)}`}
							</h5>
						</div>
						<div className="col-6">
							<h5 className="float-end mb-0">
								{pokemonInfo.types.map((type) => (
									<TypeBadge
										key={type.name}
										name={type.name}
										url={type.url}
										userLanguage={userLanguage}
									/>
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
								color={pokemonInfo.secThemeColor}
							/>
						</div>
						<div className="col-md-8 col-sm-7">
							{/* <h4 className="mx-auto">{cleanAndCapName(translatedName)}</h4> */}
							<Stat
								title="HP"
								value={pokemonInfo.stats.hp}
								color={pokemonInfo.priThemeColor}
							/>
							<Stat
								title="Attack"
								value={pokemonInfo.stats.attack}
								color={pokemonInfo.priThemeColor}
							/>
							<Stat
								title="Defence"
								value={pokemonInfo.stats.defense}
								color={pokemonInfo.priThemeColor}
							/>
							<Stat
								title="Speed"
								value={pokemonInfo.stats.speed}
								color={pokemonInfo.priThemeColor}
							/>
							<Stat
								title="Sp Atk"
								value={pokemonInfo.stats.specialAttack}
								color={pokemonInfo.priThemeColor}
							/>
							<Stat
								title="Sp Def"
								value={pokemonInfo.stats.specialDefense}
								color={pokemonInfo.priThemeColor}
							/>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col">
							<p className="">{speciesInfo.description}</p>
						</div>
					</div>
				</div>
				<hr className="mt-0" />
				<div className="card-body">
					<h5 className="card-title text-center">Profile</h5>
					<div className="row">
						<div className="col-sm-6">
							<div className="row">
								<Profile
									title="Height"
									data={`${pokemonInfo.heightCentMeters} cm (${
										pokemonInfo.heightFeet
									}'${
										pokemonInfo.heightInches - pokemonInfo.heightFeet * 12
									}")`}
								/>
								<Profile
									title="Weight"
									data={`${pokemonInfo.weightKilos} kg (${pokemonInfo.weightPounds} lbs)`}
								/>
								<Profile title="Catch Rate">
									<div className="progress">
										<div
											className="progress-bar"
											role="progressbar"
											style={{
												width: `${speciesInfo.catchRate}%`,
												backgroundColor: '#ef5350',
											}}
											aria-valuenow="15"
											aria-valuemin="0"
											aria-valuemax="100"
										>
											<small>{`${speciesInfo.catchRate}%`}</small>
										</div>
									</div>
								</Profile>
								<Profile title="Gender Ratio">
									<div className="progress">
										<div
											className="progress-bar"
											role="progressbar"
											style={{
												width: `${speciesInfo.genderRatioFemale}%`,
												backgroundColor: '#c2185b',
												// backgroundImage: 'linear-gradient(#ee1111, #c2185b)',
											}}
											aria-valuenow="15"
											aria-valuemin="0"
											aria-valuemax="100"
										>
											<small>{`${speciesInfo.genderRatioFemale}%`}</small>
										</div>
										<div
											className="progress-bar"
											role="progressbar"
											style={{
												width: `${speciesInfo.genderRatioMale}%`,
												backgroundColor: '#1976d2',
												// backgroundImage: 'linear-gradient(#1111ee, #1976d2)',
											}}
											aria-valuenow="30"
											aria-valuemin="0"
											aria-valuemax="100"
										>
											<small>{`${speciesInfo.genderRatioMale}%`}</small>
										</div>
									</div>
								</Profile>
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

function Stat({ title, value, color }) {
	return (
		<div className="row align-items-center">
			<StatTitle title={title} />
			<StatBar value={value} color={color} />
		</div>
	)
}
function StatTitle({ title }) {
	return <div className="col-md-3">{title}</div>
}
function StatBar({ value, color }) {
	return (
		<div className="col-md-9">
			<div className="progress">
				<div
					className="progress-bar "
					role="progressbar"
					style={{
						width: `${(value * 100) / 255}%`,
						backgroundColor: `#${color}`,
					}}
					aria-valuenow="25"
					aria-valuemin="0"
					aria-valuemax="100"
				>
					<small>{value}</small>
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
					style={{ imageRendering: 'pixelated' }}
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
