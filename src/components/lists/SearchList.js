import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import ItemCard from '../cards/ItemCard'
import Pagination from './Pagination'
import PokemonCard from '../cards/PokemonCard'

export default function SearchList({
	category = 'pokemon',
	pageLimit = 9999,
	search = '',
}) {
	const [items, setItems] = useState([])
	const [currentPageUrl, setCurrentPageUrl] = useState(
		`${process.env.REACT_APP_POKE_API}/${category}?limit=${pageLimit}`
	)
	const [nextPageUrl, setNextPageUrl] = useState()
	const [prevPageUrl, setPrevPageUrl] = useState()
	const [loading, setLoading] = useState(true)

	console.log("SearchList")
	useEffect(() => {
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
							{category === 'pokemon' ? (
								<>
									{items.map((item) => (
										<PokemonCard
											key={item.name}
											name={item.name}
											url={item.url}
										/>
									))}
								</>
							) : (
								<>
									{items.map((item) => (
										<ItemCard
											key={item.name}
											category={category}
											name={item.name}
											url={item.url}
										/>
									))}
								</>
							)}
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
