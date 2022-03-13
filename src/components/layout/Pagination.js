import React from 'react'

export default function Pagination({ children, gotoNextPage, gotoPrevPage }) {
  return (
    <div 
      className="w-100 d-flex mb-4"
    >
      <button 
        type="button" 
        className="btn btn-light ms-sm-5 ms-3" 
        onClick={gotoPrevPage}
        disabled={!gotoPrevPage}
      >
        Previous
      </button>
      {children}
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
