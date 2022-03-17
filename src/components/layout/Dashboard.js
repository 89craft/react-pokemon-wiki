import React, { useState } from 'react'
import useCookie from 'react-use-cookie';
import SearchInput from '../input/SearchInput'
import CategorySelect from '../input/CategorySelect'
import PageLimitSelect from '../input/PageLimitSelect'
import PaginatedList from '../lists/PaginatedList'
import SearchList from '../lists/SearchList'

export default function Dashboard() {
	// const [category, setCategory] = useState('pokemon')
	const [search, setSearch] = useState('')
	// const [pageLimit, setPageLimit] = useState(48)

	const [category, setCategory] = useCookie('category')
	if (!category) setCategory('pokemon')
	const [pageLimit, setPageLimit] = useCookie('pageLimit')
	if (!pageLimit) setPageLimit(24)

	return (
		<div className="pb-4">
			<div className="row mt-2 mb-4">
				<div className="col-lg-3 col-md-4 col-sm-6 my-2">
					<PageLimitSelect pageLimit={pageLimit} setPageLimit={setPageLimit} />
				</div>
				<div className="col-lg-4 col-md-4 col-sm-6 my-2">
					<CategorySelect category={category} setCategory={setCategory} />
				</div>
				<div className="col-lg-5 col-md-4 my-2">
					<SearchInput search={search} setSearch={setSearch} />
				</div>
			</div>
			<div className="row">
				{!search || search.length === 0 ? (
					<PaginatedList
						key={`${category} ${pageLimit}`}
						category={category}
						pageLimit={pageLimit}
					/>
				) : (
					<SearchList
						key={`${category} ${search}`}
						category={category}
						search={search}
					/>
				)}
			</div>
		</div>
	)
}
