import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <form>
        <input
          placeholder="Pokemon"
          className="form-control mx-auto"
          style={{
            backgroundColor: 'white transparent',
            height: '1.75em',
            width: '95%',
            borderRadius: '15px',
            opacity: '0.8',
            fontSize: '1.75em'
          }}
        />
      </form>
    </div>
  );
}
