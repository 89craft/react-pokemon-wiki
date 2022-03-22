import React, { useState , useEffect } from 'react'
import Axios from 'axios'
import { cleanAndCapName, getUrlId } from '../../scripts/helpers'

export default function CategorySelect({ category = 'pokemon', setCategory }) {
	return (
		<div className="input-group">
			<div className="input-group-prepend">
				<span className="input-group-text">Category:</span>
			</div>
			<select
				value={category}
				className="form-select"
				onChange={(event) => setCategory(event.target.value)}
			>
				<option value="pokemon">Pokemon</option>
				<option value="ability">Abilities</option>
				<option value="type">Types</option>
				<option value="move">Moves</option>
				{/* <option value="egg-group">Egg Groups</option>
				<option value="growth-rate">Growth Rate</option>
				<option value="pokemon-color">Pokemon Color</option> */}
				<option value="generation">Generation</option>
				<option value="berry">Berry</option>
				<option value="item">Item</option>
			</select>
		</div>
	)
}

export function FilterCategory({ category, filteredItems, setFilteredItems }) {
	const [filterCategory, setFilterCategory] = useState('')
	const [filter, setFilter] = useState('')
	const [filterItems, setFilterItems] = useState([])

	useEffect(() => {
		setFilterCategory('')
		setFilter('')
		setFilteredItems([])
	}, [category])

	function getFilterCategories() {
		switch (category) {
			case 'pokemon':
				return [
					'type',
					'move',
					'ability',
					'generation',
					'egg-group',
					'growth-rate',
					'pokedex',
					'pokemon-shape',
					'pokemon-habitat',
					'pokemon-color',
				]
			case 'move':
				return [
					'type',
					'generation',
					'move-ailment',
					'move-category',
					'move-damage-class',
					'move-target',
				]
			case 'berry':
				return ['berry-flavor', 'berry-firmness']
			case 'item':
				return ['item-attribute', 'item-category']
			default:
				return []
		}
	}

	function handleFilterCategory(event) {
		const filterCategory = event.target.value
		
		setFilter([])
		setFilteredItems([])

		if (filterCategory.length < 1 || filterCategory === 'none') {
			setFilterItems([])
		} else {
			const filterUrl = `${process.env.REACT_APP_POKE_API}/${filterCategory}?limit=9999`
			Axios.get(filterUrl).then((filterRes) => {
				const filterItems = filterRes.data.results
				if (filterItems.length > 50)
					filterItems.sort((a, b) => a.name.localeCompare(b.name))
				setFilterItems(filterItems)
			})
		}

		setFilterCategory(filterCategory)
	}

	function handleFilter(event) {
		const filter = event.target.value

		if (filter.length < 1 || filter === 'none') {
			setFilter(filter)
			return
		}

		let index = ''
		filterItems.some((item) => {
			if (item.name === filter) {
				index = getUrlId(item.url)
				return
			}
		})

		const filterUrl = `${process.env.REACT_APP_POKE_API}/${filterCategory}/${index}`
		Axios.get(filterUrl).then((filterRes) => {
			let filteredItems = []

			if (category === 'pokemon') {
				switch (filterCategory) {
					case 'type':
						filteredItems = filterRes.data.pokemon.map((pokemon) => {
							return pokemon.pokemon
						})
						break
					case 'move':
						filteredItems = filterRes.learned_by_pokemon
						break
					case 'ability':
						filteredItems = filterRes.data.pokemon.map((pokemon) => {
							return pokemon.pokemon
						})
						break
					case 'pokedex':
						filteredItems = filterRes.data.pokemon_entries.map((entry) => {
							return entry.pokemon_species
						})
						break
					case 'generation':
					case 'egg-group':
					case 'growth-rate':
					case 'pokemon-shape':
					case 'pokemon-color':
					case 'pokemon-habitat':
						filteredItems = filterRes.data.pokemon_species
						break
				}
			} else if (category === 'move') {
				filteredItems = filterRes.data.moves
			} else if (category === 'berry') {
				switch (filterCategory) {
					case 'berry-flavor':
						filteredItems = filterRes.data.berries
							.map((berry) => {
								return berry.data.berry
							})
							.reverse()
						break
					case 'berry-firmness':
						// console.log('berry-firmness')
						filteredItems = filterRes.data.berries
						break
				}
			} else if (category === 'item') {
				filteredItems = filterRes.data.items
			}

			setFilteredItems(filteredItems ? filteredItems : [])
		})

		setFilter(filter)
	}

	return (
		<div className="input-group">
			<div className="input-group-prepend">
				<span className="input-group-text">Filter:</span>
			</div>
			<select
				value={filterCategory}
				className="form-select"
				onChange={handleFilterCategory}
			>
				<option value="none">None</option>
				{getFilterCategories().map((name) => (
					<option key={name} value={name}>
						{cleanAndCapName(name)}
					</option>
				))}
			</select>
			<select value={filter} className="form-select" onChange={handleFilter}>
				<option value="none">None</option>
				{filterItems.map((item) => (
					<option key={item.name} value={item.name}>
						{cleanAndCapName(item.name)}
					</option>
				))}
			</select>
		</div>
	)
}
