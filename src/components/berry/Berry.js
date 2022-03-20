import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios'
import {
	buildPathName,
	cleanAndCapName,
	capName,
	getUrlId,
	getUserLanguage,
} from '../../scripts/helpers'
import { TypeBadge } from '../type/Type'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../layout/NotFound'

export default function Berry() {
	let { index } = useParams()
	const userLanguage = getUserLanguage()

	const [notFound, setNotFound] = useState(false)
	const [berryInfo, setberryInfo] = useState({
		id: '',
		name: '',
		flavor: {
			spicy: '',
			dry: '',
			sweet: '',
			bitter: '',
			sour: '',
		},
		firmness: { name: '', url: '' },
		growthTime: '',
		maxHarvest: '',
		giftPower: '',
		giftType: { name: '', url: '' },
		size: '',
		smoothness: '',
		soilDryness: '',
		item: { name: '', url: '' },
	})

	useEffect(() => {
		const berryUrl = `${process.env.REACT_APP_POKE_API}/berry/${index}/`

		Axios.get(berryUrl)
			.then((berryRes) => {
				const id = berryRes.data.id
				const name = berryRes.data.name.toLowerCase()

				let { spicy, dry, sweet, bitter, sour } = ''
				berryRes.data.flavors.map((flavor) => {
					switch (flavor.flavor.name) {
						case 'spicy':
							spicy = flavor.potency
							break
						case 'dry':
							dry = flavor.potency
							break
						case 'sweet':
							sweet = flavor.potency
							break
						case 'bitter':
							bitter = flavor.potency
							break
						case 'sour':
							sour = flavor.potency
							break
						default:
							break
					}
				})

				const firmness = berryRes.data.firmness
				const growthTime = berryRes.data.growth_time
				const maxHarvest = berryRes.data.max_harvest
				const giftPower = berryRes.data.natural_gift_power
				const giftType = berryRes.data.natural_gift_type
				const size = berryRes.data.size
				const smoothness = berryRes.data.smoothness
				const soilDryness = berryRes.data.soil_dryness
				const item = berryRes.data.item

				setberryInfo({
					id,
					name,
					flavor: {
						spicy,
						dry,
						sweet,
						bitter,
						sour,
					},
					firmness,
					growthTime,
					maxHarvest,
					giftPower,
					giftType,
					size,
					smoothness,
					soilDryness,
					item,
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
					<h5>{capName(berryInfo.name)}</h5>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-md-4 col-sm-5">
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${berryInfo.item.name}.png`}
								alt={berryInfo.item.name}
								className="card-img-top rounded mx-auto mt-2"
								style={{ imageRendering: 'pixelated' }}
							/>
						</div>
						<div className="col-md-8 col-sm-7">
							<h4 className="mx-auto">{capName(berryInfo.name)}</h4>
							<Flavor title="Spicy" value={berryInfo.flavor.spicy} />
							<Flavor title="Dry" value={berryInfo.flavor.dry} />
							<Flavor title="Sweet" value={berryInfo.flavor.sweet} />
							<Flavor title="Bitter" value={berryInfo.flavor.bitter} />
							<Flavor title="Sour" value={berryInfo.flavor.sour} />
							{/* <p className="mt-3">{speciesInfo.description}</p> */}
						</div>
					</div>
					{/* <div className="row mt-1">
						<div className="col">
							<p>{berryInfo.description}</p>
						</div>
					</div> */}
				</div>
				<hr className="mt-0" />
				<div className="card-body">
					{/* <h5 className="card-title text-center">Profile</h5> */}
					<div className="row">
						<div className="col-sm-6">
							<div className="row">
								<Profile title="Size" data={`${berryInfo.size} mm`} />
								<Profile
									title="Growth Time"
									data={`${berryInfo.growthTime * 4} hrs`}
								/>
								<Profile title="Soil Dryness" data={berryInfo.soilDryness} />
								<Profile
									title="Max Harvest"
									data={`${berryInfo.maxHarvest} berries / tree`}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="row">
								<Profile title="Smoothness" data={berryInfo.smoothness} />
								<Profile title="Firmness">
									<h6>
										<Link
											key={berryInfo.firmness.name}
											className="mx-1"
											style={{ textDecoration: 'none' }}
											to={buildPathName(
												`/berry-firmness/${getUrlId(berryInfo.firmness.url)}`
											)}
										>
											<span
												className="badge text-nowrap"
												style={{ backgroundColor: `#ef5350`, color: 'white' }}
											>
												{cleanAndCapName(berryInfo.firmness.name)}
											</span>
										</Link>
									</h6>
								</Profile>
								<Profile title="Gift Power" data={berryInfo.giftPower} />
								<Profile title="Gift Type">
									<h6>
										<TypeBadge
											name={berryInfo.giftType.name}
											url={berryInfo.giftType.url}
											userLanguage={userLanguage}
										/>
									</h6>
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
						items={berryInfo.species}
						title="Pokemon"
						category="pokemon"
					/>
				</div>
			</div>
		</div>
	)
}

function Flavor({ title, value }) {
	return (
		<div className="row align-items-center">
			<FlavorTitle title={title} />
			<FlavorBar value={value} />
		</div>
	)
}
function FlavorTitle({ title }) {
	return <div className="col-md-3">{title}</div>
}
function FlavorBar({ value }) {
	return (
		<div className="col-md-9">
			<div className="progress">
				<div
					className="progress-bar "
					role="progressbar"
					style={{
						width: `${(value * 100) / 40}%`,
						backgroundColor: `#ef5350`,
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
	console.log(data)
	return (
		<div className="col-7">
			{children ? <>{children}</> : <h6 className="float-start">{data}</h6>}
		</div>
	)
}
