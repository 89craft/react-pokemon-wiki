import React from 'react'

export default function Pagination({
	gotoNextPage,
	gotoPrevPage,
	page,
	totalPages,
}) {
	const buttonWidth = 90
	return (
		<div className="w-100 my-md-3 my-2">
			{(gotoPrevPage || gotoNextPage) && (
				<div
					className="d-flex mx-auto align-items-center"
					style={{ maxWidth: '75%', minWidth: 'min( 296px, 100% )' }}
				>
					<button
						type="button"
						className="btn btn-dark text-center"
						style={{ width: `${buttonWidth}px` }}
						onClick={gotoPrevPage}
						disabled={!gotoPrevPage}
					>
						Previous
					</button>
					<h6
						className="mx-auto"
						style={{ marginBottom: '0' }}
					>{`${page} of ${totalPages}`}</h6>
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
