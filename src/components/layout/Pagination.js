import React from 'react'

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div 
      className="w-100 d-flex"
    >
      <button 
        type="button" 
        className="btn btn-light ms-sm-5 ms-3" 
        onClick={gotoPrevPage}
        disabled={!gotoPrevPage}
      >
        Previous
      </button>
      <button 
        type="button" 
        className="btn btn-light ms-auto me-sm-5 me-3" 
        onClick={gotoNextPage}
        disabled={!gotoNextPage}
      >
        Next
      </button>
    </div>
  )
}
