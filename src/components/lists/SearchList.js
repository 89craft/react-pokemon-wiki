import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { getUserLanguage } from '../../scripts/helpers'
import Pagination from './Pagination'
import PokemonCard from '../cards/PokemonCard'
import TypeCard from '../cards/TypeCard'
import ItemCard from '../cards/ItemCard'
import DefaultCard from '../cards/DefaultCard'

export default function SearchList({
	category = 'pokemon',
	pageLimit = 9999,
	search = '',
	filteredItems = [],
}) {
	const userLanguage = getUserLanguage()

	const [items, setItems] = useState(filteredItems)
	const [currentPageUrl, setCurrentPageUrl] = useState(
		`${process.env.REACT_APP_POKE_API}/${category}?limit=${pageLimit}`
	)
	const [nextPageUrl, setNextPageUrl] = useState()
	const [prevPageUrl, setPrevPageUrl] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (filteredItems.length > 0) {
			filteredItems.filter((items) => {
				return items.name.includes(search.toLowerCase())
			})
			setLoading(false)
			return
		}

		setLoading(true)
		let cancel
		Axios.get(currentPageUrl, {
			cancelToken: new Axios.CancelToken((c) => (cancel = c)),
		}).then((res) => {
			setLoading(false)
			setNextPageUrl(res.data.next)
			setPrevPageUrl(res.data.previous)
			setItems(
				res.data.results.filter((items) => {
					return items.name.includes(search.toLowerCase())
				})
			)
		})

		return () => {
			cancel()
		}
	}, [currentPageUrl])

	function gotoNextPage() {
		setCurrentPageUrl(nextPageUrl)
	}
	function gotoPrevPage() {
		setCurrentPageUrl(prevPageUrl)
	}

	return (
		<>
			<Pagination
				gotoNextPage={nextPageUrl ? gotoNextPage : null}
				gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
			/>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="row">
					{items.length > 0 ? (
						<>
							{category === 'pokemon'
								? items.map((item) => (
										<PokemonCard
											key={item.name}
											name={item.name}
											url={item.url}
										/>
								  ))
								: category === 'type'
								? items.map((item) => (
										<TypeCard
											key={item.name}
											name={item.name}
											url={item.url}
											userLanguage={userLanguage}
										/>
								  ))
								: category === 'item'
								? items.map((item) => (
										<ItemCard key={item.name} name={item.name} url={item.url} />
								  ))
								: items.map((item) => (
										<DefaultCard
											key={item.name}
											category={category}
											name={item.name}
											url={item.url}
										/>
								  ))}
						</>
					) : (
						<h5>No Matches</h5>
					)}
				</div>
			)}
			<Pagination
				gotoNextPage={nextPageUrl ? gotoNextPage : null}
				gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
			/>
		</>
	)
}
