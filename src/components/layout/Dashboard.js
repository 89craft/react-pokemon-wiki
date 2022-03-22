import React, { useState } from 'react'
import useCookie from 'react-use-cookie';
import SearchInput from '../input/SearchInput'
import CategorySelect from '../input/CategorySelect'
import PageLimitSelect from '../input/PageLimitSelect'
import PaginatedList from '../lists/PaginatedList'
import SearchList from '../lists/SearchList'
import { FilterCategory } from '../input/CategorySelect';

export default function Dashboard() {
	// const [category, setCategory] = useState('pokemon')
	const [search, setSearch] = useState('')
	// const [pageLimit, setPageLimit] = useState(48)
	const [filteredItems, setFilteredItems] = useState([])

	const [category, setCategory] = useCookie('category')
	if (!category) setCategory('pokemon')
	const [pageLimit, setPageLimit] = useCookie('pageLimit')
	if (!pageLimit) setPageLimit(24)

	return (
		<div className="pb-4">
			<div className="row mt-2 mb-4">
				<div className="my-2 col-lg-4 col-md-5 col-sm-6 order-md-1 order-sm-2 order-4">
					<PageLimitSelect pageLimit={pageLimit} setPageLimit={setPageLimit} />
				</div>
				<div className="my-2 col-lg-8 col-md-7 order-md-2 order-1">
					<SearchInput search={search} setSearch={setSearch} />
				</div>
				<div className="my-2 col-lg-4 col-md-5 col-sm-6 order-sm-3 order-2">
					<CategorySelect category={category} setCategory={setCategory} />
				</div>
				<div className="my-2 col-lg-8 col-md-7 order-sm-4 order-3">
					<FilterCategory category={category} setFilteredItems={setFilteredItems} />
				</div>
			</div>
			<div className="row">
				{search.length > 0 || filteredItems.length > 0 ? (
					<SearchList
						key={`${category}${search}${filteredItems.length}`}
						category={category}
						search={search}
						filteredItems={filteredItems}
					/>
				) : (
					<PaginatedList
						key={`${category}${pageLimit}`}
						category={category}
						pageLimit={pageLimit}
					/>
				)}
			</div>
		</div>
	)
}
