import React from 'react'

const PAGE_LIMITS = [6, 12, 24, 48, 96, 192/* , 384, 768, 1536 */]

export default function PageLimitSelect({ pageLimit, setPageLimit }) {
	return (
		<form>
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">Page Limit:</span>
				</div>
				<select
					value={pageLimit}
					className="form-select"
					onChange={(event) => setPageLimit(event.target.value)}
				>
					{PAGE_LIMITS.map((value) => (
						<option key={value} value={value}>
							{value}
						</option>
					))}
				</select>
			</div>
		</form>
	)
}
