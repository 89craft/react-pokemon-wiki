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
					<option value="move">Moves</option>
					<option value="egg-group">Egg Groups</option>
					<option value="growth-rate">Growth Rate</option>
					<option value="pokemon-color">Pokemon Color</option>
				</select>
			</div>
		</form>
	)
}
