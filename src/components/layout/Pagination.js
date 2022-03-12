import React from 'react'

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div className="w-100 d-flex mb-3">
      <button 
        type="button" 
        className="btn btn-light" 
        onClick={gotoPrevPage}
        disabled={!gotoPrevPage}
      >
        Previous
      </button>
      <button 
        type="button" 
        className="btn btn-light" 
        style={{marginLeft: "auto"}}
        onClick={gotoNextPage}
        disabled={!gotoNextPage}
      >
        Next
      </button>
    </div>
  )
}
