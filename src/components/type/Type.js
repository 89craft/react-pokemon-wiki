import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios'
import styled from 'styled-components'
import {
	buildPathName,
	capName,
	getUrlId,
	getUserLanguage,
} from '../../helpers'
import SoftLockList from '../lists/SoftLockList'
import NotFound from '../layout/NotFound'
// import { RiSpeedFill, RiPlayFill, RiCloseFill } from 'react-icons/ri'

export const TYPE_COLORS = require('./typeColors.json')
export const TYPE_NAMES = require('./typeNames.json')

const Badge = styled.span`
	display: inline-block;
	padding: 0.35em 0.5em;
	text-align: center;
	white-space: nowrap;
	vertical-align: baseline;
	border-radius: 0.25rem;
`

export default function Type() {
	let { index } = useParams()
	const userLanguage = getUserLanguage()

	const [notFound, setNotFound] = useState(false)
	const [typeInfo, setTypeInfo] = useState({
		id: '',
		name: '',
		translatedName: '',
		pokemon: [],
		moves: [],
		doubleFrom: [],
		halfFrom: [],
		noneFrom: [],
		doubleTo: [],
		halfTo: [],
		noneTo: [],
	})

	useEffect(() => {
		const typeUrl = `${process.env.REACT_APP_POKE_API}/type/${index}/`

		Axios.get(typeUrl)
			.then((typeRes) => {
				const id = typeRes.data.id

				const name = typeRes.data.name.toLowerCase()
				let translatedName = name
				typeRes.data.names.some((name) => {
					if (name.language.name === userLanguage) {
						translatedName = name.name
						return
					}
				})

				const pokemon = typeRes.data.pokemon.map((pokemon) => {
					const name = pokemon.pokemon.name
					const url = pokemon.pokemon.url
					return { name, url }
				})

				const moves = typeRes.data.moves

				const doubleFrom = typeRes.data.damage_relations.double_damage_from
				const halfFrom = typeRes.data.damage_relations.half_damage_from
				const noneFrom = typeRes.data.damage_relations.no_damage_from
				const doubleTo = typeRes.data.damage_relations.double_damage_to
				const halfTo = typeRes.data.damage_relations.half_damage_to
				const noneTo = typeRes.data.damage_relations.no_damage_to

				setTypeInfo({
					id,
					name,
					translatedName,
					pokemon,
					moves,
					doubleFrom,
					halfFrom,
					noneFrom,
					doubleTo,
					halfTo,
					noneTo,
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
					style={{
						backgroundColor: `#${TYPE_COLORS[typeInfo.name]}`,
						color: 'white',
					}}
				>
					<div className="row">
						<div className="col-6">
							<h5>
								{typeInfo.id} {/* capName(typeInfo.translatedName) */}
							</h5>
						</div>
					</div>
				</div>
				<div className="card-body">
					{/* <div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							<h4 className="mx-auto">{capName(translatedName)}</h4>
						</div>
					</div> */}
					{/* <div className="row mt-1">
            <div className="col">
              <p className="">{description}</p>
            </div>
          </div> */}
					<div className="row">
						<div className="col order-2">
							<div className="d-flex flex-column">
								<h5 className="text-center">From</h5>
								<DamageFrom types={typeInfo.doubleFrom}>
									<h4 className="m-1">X2</h4>
									{/* <RiSpeedFill style={{ width: '2em', height: '2em' }} /> */}
								</DamageFrom>
								<hr></hr>
								<DamageFrom types={typeInfo.halfFrom}>
									<h4 className="m-1">/2</h4>
									{/* <RiPlayFill style={{ width: '2em', height: '2em' }} /> */}
								</DamageFrom>
								<hr></hr>
								<DamageFrom types={typeInfo.noneFrom}>
									<h4 className="m-1">X0</h4>
									{/* <RiCloseFill style={{ width: '2em', height: '2em' }} /> */}
								</DamageFrom>
							</div>
						</div>
						<div className="col-md-3 d-flex flex-column justify-content-between align-items-center order-md-3 order-1">
							<h4 className="text-center">Damage Relations</h4>
							<h2 style={{ margin: '1em' }}>
								<TypeBadge
									name={typeInfo.name}
									translatedName={typeInfo.translatedName}
								/>
							</h2>
							<h4></h4>
						</div>
						<div className="col order-4">
							<div className="d-flex flex-column">
								<h5 className="text-center">To</h5>
								<DamageTo types={typeInfo.doubleTo}>
									<h4 className="m-1">X2</h4>
									{/* <RiSpeedFill style={{ width: '2em', height: '2em' }} /> */}
								</DamageTo>
								<hr></hr>
								<DamageTo types={typeInfo.halfTo}>
									<h4 className="m-1">/2</h4>
									{/* <RiPlayFill style={{ width: '2em', height: '2em' }} /> */}
								</DamageTo>
								<hr></hr>
								<DamageTo types={typeInfo.noneTo}>
									<h4 className="m-1">X0</h4>
									{/* <RiCloseFill style={{ width: '2em', height: '2em' }} /> */}
								</DamageTo>
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
						items={typeInfo.pokemon}
						title="Pokemon"
						category="pokemon"
					/>
				</div>
			</div>
			<div className="row">
				<div className="col mb-5">
					<SoftLockList items={typeInfo.moves} title="Moves" category="move" />
				</div>
			</div>
		</div>
	)
}

function DamageFrom({ children, types }) {
	return (
		<div className="d-flex justify-content-end align-items-center">
			<div>
				{types.length > 0 ? (
					<h4 style={{ marginBottom: '0' }}>
						{types.map((type) => (
							<TypeBadge key={type.name} name={type.name} url={type.url} />
						))}
					</h4>
				) : (
					<h6 style={{ marginBottom: '0' }}>
						<EmptyBadge />
					</h6>
				)}
			</div>
			<div>{children}</div>
		</div>
	)
}
function DamageTo({ children, types }) {
	return (
		<div className="d-flex justify-content-start align-items-center">
			<div>{children}</div>
			<div>
				{types.length > 0 ? (
					<h4 style={{ marginBottom: '0' }}>
						{types.map((type) => (
							<TypeBadge key={type.name} name={type.name} url={type.url} />
						))}
					</h4>
				) : (
					<h6 style={{ marginBottom: '0' }}>
						<EmptyBadge />
					</h6>
				)}
			</div>
		</div>
	)
}

export function TypeBadge({ name, url, userLanguage = 'en' }) {
	function getTranslatedName() {
		if (!name) return name
		const set = TYPE_NAMES.find((entry) => {
			if (entry.name === name) return entry
		})
		let translatedName = name
		set.names.some((name) => {
			if (name.language.name === getUserLanguage()) {
				translatedName = name.name
				return
			}
		})
		return translatedName
	}

	return (
		<Link
			key={name}
			className="badge"
			style={{
				padding: '0',
				margin: '0.3em 0.4em',
			}}
			to={url ? buildPathName(`/type/${getUrlId(url)}`) : ''}
		>
			<Badge
				style={{
					backgroundColor: `#${TYPE_COLORS[name]}`,
					color: 'white',
				}}
			>
				{getTranslatedName()}
			</Badge>
		</Link>
	)
}
function EmptyBadge() {
	return (
		<Badge
			className="badge"
			style={{
				backgroundColor: `#778`,
				color: 'white',
				marginLeft: '1em',
				marginRight: '1em',
			}}
		>
			None
		</Badge>
	)
}
