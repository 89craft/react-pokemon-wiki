import React from 'react'

export default function CategorySelect({ category = 'pokemon', setCategory }) {
	return (
		<form>
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
				</select>
			</div>
		</form>
	)
}
