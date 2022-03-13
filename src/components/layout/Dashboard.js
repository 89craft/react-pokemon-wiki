import React, { useState } from 'react'
import SearchBar from '../search/SearchBar'
import PaginatedList from '../search/PaginatedList'
import SearchList from '../search/SearchList'

export default function Dashboard() {
	const [category, setCategory] = useState('pokemon')
	const [search, setSearch] = useState('')
	const [pageLimit, setPageLimit] = useState(60)
	const [listPageLimit, setListPageLimit] = useState(pageLimit)

	function handlePageLimit(event) {
		event.preventDefault()
		setListPageLimit(event.target[0].value)
	}

	return (
		<>
			<SearchBar
				category={category}
				setCategory={setCategory}
				search={search}
				setSearch={setSearch}
			/>
			<form className="my-4 mx-sm-5 mx-3" onSubmit={handlePageLimit}>
				<div className="input-group my-3">
					<div className="input-group-prepend">
						<span className="input-group-text">Page Limit:</span>
					</div>
					<input
						type="number"
						value={pageLimit}
						step="12"
						min="12"
						className="form-control"
						onChange={(event) => setPageLimit(event.target.value)}
					/>
					<input type="submit" value="Update" className="btn btn-success" />
				</div>
			</form>
			<div className="row">
				<div className="col">
					{search ? (
						<SearchList
							key={`${category} ${listPageLimit} ${search}`}
							category={category}
							pageLimit={listPageLimit}
							search={search}
						/>
					) : (
						<PaginatedList
							key={`${category} ${listPageLimit}`}
							category={category}
							pageLimit={listPageLimit}
						/>
					)}
				</div>
			</div>
		</>
	)
}
