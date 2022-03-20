import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { getUserLanguage } from '../../scripts/helpers'
import Pagination from './Pagination'
import PokemonCard from '../cards/PokemonCard'
import TypeCard from '../cards/TypeCard'
import ItemCard from '../cards/ItemCard'

export default function PaginatedList({ category, pageLimit }) {
	if (!category) category = 'pokemon'
	if (!pageLimit) pageLimit = 48
	const userLanguage = getUserLanguage()

	const [items, setItems] = useState([])
	const [currentPageUrl, setCurrentPageUrl] = useState(
		`${process.env.REACT_APP_POKE_API}/${category}?limit=${pageLimit}`
	)
	const [nextPageUrl, setNextPageUrl] = useState()
	const [prevPageUrl, setPrevPageUrl] = useState()
	const [loading, setLoading] = useState(true)

	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	useEffect(() => {
		setLoading(true)
		let cancel
		Axios.get(currentPageUrl, {
			cancelToken: new Axios.CancelToken((c) => (cancel = c)),
		}).then((res) => {
			setLoading(false)

			const count = res.data.count
			const pageParams = new URLSearchParams(currentPageUrl.split('?')[1])
			const limit = pageParams.get('limit')
			const offset = pageParams.get('offset')
			setPage(Math.ceil(offset / limit) + 1)
			setTotalPages(Math.ceil(count / limit) + 1)

			setNextPageUrl(res.data.next)
			setPrevPageUrl(res.data.previous)
			setItems(res.data.results)
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
				page={page}
				totalPages={totalPages}
			/>
			{loading ? (
				<p>Loading...</p>
			) : category === 'pokemon' ? (
				items.map((item) => (
					<PokemonCard key={item.name} name={item.name} url={item.url} />
				))
			) : category === 'type' ? (
				items.map((item) => (
					<TypeCard key={item.name} name={item.name} url={item.url} userLanguage={userLanguage} />
				))
			) : (
				items.map((item) => (
					<ItemCard
						key={item.name}
						category={category}
						name={item.name}
						url={item.url}
					/>
				))
			)}
			<Pagination
				gotoNextPage={nextPageUrl ? gotoNextPage : null}
				gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
				page={page}
				totalPages={totalPages}
			/>
		</>
	)
}
