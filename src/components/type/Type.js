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
import NotFound from '../../NotFound'
import { RiSpeedFill, RiPlayFill, RiCloseFill } from 'react-icons/ri'

export const TYPE_COLORS = {
	bug: 'a8b820',
	dark: '705848',
	dragon: '7038f8',
	electric: 'f8d030',
	fairy: 'f0b6bc',
	fighting: 'c03028',
	fire: 'f08030',
	flying: 'a890f0',
	ghost: '705898',
	grass: '78c850',
	ground: 'e0c068',
	ice: '98d8d8',
	normal: 'a8a878',
	poison: 'a040a0',
	psychic: 'f85888',
	rock: 'b8a038',
	steel: 'b8b8d0',
	water: '6890f0',
	/* bug: 'B1C12E',
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
	water: '3295F6', */
}

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
	// const [id, setId] = useState('')
	// const [name, setName] = useState('')
	// const [pokemon, setPokemon] = useState([])
	// const [moves, setMoves] = useState([])
	// const [doubleFrom, setDoubleFrom] = useState([])
	// const [halfFrom, setHalfFrom] = useState([])
	// const [noneFrom, setNoneFrom] = useState([])
	// const [doubleTo, setDoubleTo] = useState([])
	// const [halfTo, setHalfTo] = useState([])
	// const [noneTo, setNoneTo] = useState([])

	const [typeInfo, setTypeInfo] = useState({
		id: '',
		name: '',
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

				// setId(id)
				// setName(name)
				// setPokemon(pokemon)
				// setMoves(moves)
				// setDoubleFrom(doubleFrom)
				// setHalfFrom(halfFrom)
				// setNoneFrom(noneFrom)
				// setDoubleTo(doubleTo)
				// setHalfTo(halfTo)
				// setNoneTo(noneTo)

				setTypeInfo({
					id,
					name,
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
								{typeInfo.id} {/* capName(typeInfo.name) */}
							</h5>
						</div>
					</div>
				</div>
				<div className="card-body">
					{/* <div className="row align-items-center">
						<div className="col-md-9 col-sm-7">
							<h4 className="mx-auto">{capName(name)}</h4>
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
								<TypeBadge name={typeInfo.name} />
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
					<SoftLockList items={typeInfo.pokemon} title="Pokemon" category="pokemon" />
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

function TypeBadge({ name, url }) {
	return (
		<Link
			key={name}
			className="badge"
			to={url ? buildPathName(`/type/${getUrlId(url)}`) : ''}
		>
			<Badge
				style={{
					backgroundColor: `#${TYPE_COLORS[name]}`,
					color: 'white',
				}}
			>
				{capName(name)}
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
