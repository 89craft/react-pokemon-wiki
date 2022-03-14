import React, { useState } from 'react'
import SearchInput from '../search/SearchInput'
import CategorySelect from '../search/CategorySelect'
import PageLimitSelect from '../search/PageLimitSelect'
import PaginatedList from '../search/PaginatedList'
import SearchList from '../search/SearchList'

export default function Dashboard() {
	const [category, setCategory] = useState('pokemon')
	const [search, setSearch] = useState('')
	const [pageLimit, setPageLimit] = useState(48)

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
				{search ? (
					<SearchList
						key={`${category} ${search}`}
						category={category}
						search={search}
					/>
				) : (
					<PaginatedList
						key={`${category} ${pageLimit}`}
						category={category}
						pageLimit={pageLimit}
					/>
				)}
			</div>
		</div>
	)
}
