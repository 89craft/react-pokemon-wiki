import React from 'react'

export default function Pagination({
	gotoNextPage,
	gotoPrevPage,
	page,
	totalPages,
}) {
	const buttonWidth = 90
	return (
		<div className="w-100 px-5 my-md-3 my-2">
			{(gotoPrevPage || gotoNextPage) && (
				<div className="d-flex mx-auto" style={{ maxWidth: '75%' }}>
					<button
						type="button"
						className="btn btn-dark text-center"
						style={{ width: `${buttonWidth}px` }}
						onClick={gotoPrevPage}
						disabled={!gotoPrevPage}
					>
						Previous
					</button>
					<div className="mx-auto">{`${page} of ${totalPages}`}</div>
					<button
						type="button"
						className="btn btn-dark text-center"
						style={{ width: `${buttonWidth}px` }}
						onClick={gotoNextPage}
						disabled={!gotoNextPage}
					>
						Next
					</button>
				</div>
			)}
		</div>
	)
}
