import React from 'react';

let categories = new Map();
categories.set('1', 'pokemon');
categories.set('2', 'ability');
categories.set('3', 'type');

export default function SearchBar({ category, setCategory, search, setSearch }) {

  function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
  }

  return (
    <form className="my-4">
      <div className="input-group my-3">
        <select 
          value={getByValue(categories, category)} 
          className="custom-select" 
          onChange={event => setCategory(categories.get(event.target.value))}
        >
          <option value="1">Pokemon</option>
          <option value="2">Abilities</option>
          <option value="3">Types</option>
        </select>
        <input 
          placeholder="..." 
          value={search} 
          className="form-control" 
          onChange={event => setSearch(event.target.value)} 
        />
        <input type="submit" value="Search" className="btn btn-success" />
      </div>
    </form>
  )
  /* return (
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
  ); */
}
