import React, { useState } from 'react'

export default function SearchInput({ search = '', setSearch }) {
	const [internalSearch, setInternalSearch] = useState(search)
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault()
				setSearch(event.target[0].value)
			}}
		>
			<div className="input-group">
				<input
					placeholder=""
					value={internalSearch}
					className="form-control"
					onChange={(event) => setInternalSearch(event.target.value)}
				/>
				<input type="submit" value="Search" className="btn btn-success" />
			</div>
		</form>
	)
}
