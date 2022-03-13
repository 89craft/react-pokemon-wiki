import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import NotFound from '../../NotFound'

const TYPE_COLORS = {
	bug: 'B1C12E',
	dark: '4F3A2D',
	dragon: '755EDF',
	electric: 'FCBC17',
	fairy: 'F4B1F4',
	fighting: '823551D',
	fire: 'E73B0C',
	flying: 'A3B3F7',
	ghost: '6060B2',
	grass: '74C236',
	ground: 'D3B357',
	ice: 'A3E7FD',
	normal: 'C8C4BC',
	poison: '934594',
	psychic: 'ED4882',
	rock: 'B9A156',
	steel: 'B5B5C3',
	water: '3295F6',
}

export default function Pokemon() {
	let { index } = useParams()
	//const profileTitleWidth = 5
	const profileDataWidth = 7

	const [notFound, setNotFound] = useState(false)

	const [name, setName] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [types, setTypes] = useState([])
	const [description, setDescription] = useState('')
	const [stats, setStats] = useState({
		hp: '',
		attack: '',
		defense: '',
		speed: '',
		specialAttack: '',
		specialDefense: '',
	})
	const [height, setHeight] = useState('')
	const [weight, setWeight] = useState('')
	const [eggGroups, setEggGroups] = useState('')
	const [catchRate, setCatchRate] = useState('')
	const [abilities, setAbilities] = useState('')
	const [genderRatioMale, setGenderRatioMale] = useState('')
	const [genderRatioFemale, setGenderRatioFemale] = useState('')
	const [evs, setEvs] = useState('')
	const [hatchSteps, setHatchSteps] = useState('')
	const [themeColor, setThemeColor] = useState('#EF5350')

	useEffect(() => {
		const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${index}/`
		const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${index}/`

		Axios.get(pokemonUrl)
			.then((pokemonRes) => {
				const name = pokemonRes.data.name
				const imageUrl = pokemonRes.data.sprites.front_default

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

				const types = pokemonRes.data.types.map((type) => type.type.name)

				const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`

				const abilities = pokemonRes.data.abilities
					.map((ability) => {
						return ability.ability.name
							.toLowerCase()
							.split('-')
							.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
							.join(' ')
					})
					.join(', ')

				const evs = pokemonRes.data.stats
					.filter((stat) => {
						if (stat.effort > 0) {
							return true
						}
						return false
					})
					.map((stat) => {
						return `${stat.effort} ${stat.stat.name
							.toLowerCase()
							.split('-')
							.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
							.join(' ')}`
					})
					.join(', ')

				// Get Pokemon Description .... Is from a different end point uggh
				Axios.get(pokemonSpeciesUrl).then((res) => {
					let description = ''
					res.data.flavor_text_entries.some((flavor) => {
						if (flavor.language.name === 'en') {
							description = flavor.flavor_text
							return
						}
					})
					const femaleRate = res.data['gender_rate']
					const genderRatioFemale = 12.5 * femaleRate
					const genderRatioMale = 12.5 * (8 - femaleRate)

					const catchRate = Math.round((100 / 255) * res.data['capture_rate'])

					const eggGroups = res.data['egg_groups']
						.map((group) => {
							return group.name
								.toLowerCase()
								.split(' ')
								.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
								.join(' ')
						})
						.join(', ')

					const hatchSteps = 255 * (res.data['hatch_counter'] + 1)

					setDescription(description)
					setGenderRatioFemale(genderRatioFemale)
					setGenderRatioMale(genderRatioMale)
					setCatchRate(catchRate)
					setEggGroups(eggGroups)
					setHatchSteps(hatchSteps)
				})

				setImageUrl(imageUrl)
				//setPokemonIndex(pokemonIndex)
				setName(name)
				setTypes(types)
				setStats({
					hp,
					attack,
					defense,
					speed,
					specialAttack,
					specialDefense,
				})
				setThemeColor(themeColor)
				setHeight(height)
				setWeight(weight)
				setAbilities(abilities)
				setEvs(evs)
			})
			.catch((err) => {
				setNotFound(true)
			})
	}, [])

	return (
		<div className="col">
			{notFound && <NotFound />}
			<div className="card">
				<div className="card-header">
					<div className="row">
						<div className="col-6">
							<h5>
								{index}{' '}
								{/* name
                  .toLowerCase()
                  .split(' ')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ') */}
							</h5>
						</div>
						<div className="col-6">
							<div className="float-end">
								{types.map((type) => (
									<span
										key={type}
										className="badge badge-pill me-1"
										style={{
											backgroundColor: `#${TYPE_COLORS[type]}`,
											color: 'white',
										}}
									>
										{type
											.toLowerCase()
											.split(' ')
											.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
											.join(' ')}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-3 col-sm-5">
							<img
								src={imageUrl}
								alt={name}
								className="card-img-top rounded mx-auto mt-2"
								style={{ maxHeight: '256px', maxWidth: '256px' }}
							/>
						</div>
						<div className="col-md-9 col-sm-7">
							<h4 className="mx-auto">
								{name
									.toLowerCase()
									.split(' ')
									.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
									.join(' ')}
							</h4>
							<Stat title="HP" width={stats.hp} color={themeColor} />
							<Stat title="Attack" width={stats.attack} color={themeColor} />
							<Stat title="Defence" width={stats.defense} color={themeColor} />
							<Stat title="Speed" width={stats.speed} color={themeColor} />
							<Stat
								title="Sp Atk"
								width={stats.specialAttack}
								color={themeColor}
							/>
							<Stat
								title="Sp Def"
								width={stats.specialDefense}
								color={themeColor}
							/>
						</div>
					</div>
					<div className="row mt-1">
						<div className="col">
							<p className="">{description}</p>
						</div>
					</div>
				</div>
				<hr />
				<div className="card-body">
					<h5 className="card-title text-center">Profile</h5>
					<div className="row">
						<div className="col-sm-6">
							<div className="row">
								<Profile title="Height" data={`${height} ft.`} />
								<Profile title="Weight" data={`${weight} lbs`} />
								<Profile title="Catch Rate" data={`${catchRate}%`} />
								<ProfileTitle title="Gender Ratio" />
								<div className={`col-${profileDataWidth}`}>
									<div className="progress">
										<div
											className="progress-bar"
											role="progressbar"
											style={{
												width: `${genderRatioFemale}%`,
												backgroundColor: '#c2185b',
											}}
											aria-valuenow="15"
											aria-valuemin="0"
											aria-valuemax="100"
										>
											<small>{genderRatioFemale}</small>
										</div>
										<div
											className="progress-bar"
											role="progressbar"
											style={{
												width: `${genderRatioMale}%`,
												backgroundColor: '#1976d2',
											}}
											aria-valuenow="30"
											aria-valuemin="0"
											aria-valuemax="100"
										>
											<small>{genderRatioMale}</small>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="row">
								<Profile title="Egg Groups" data={eggGroups} />
								<Profile title="Hatch Steps" data={hatchSteps} />
								<Profile title="Abilities" data={abilities} />
								<Profile title="EVs" data={evs} />
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
			<h6 className="float-end text-end">{title}:</h6>
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
