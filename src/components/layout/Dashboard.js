import React from 'react';
import PokemonList from '../pokemon/PokemonList';
//import SearchBar from '../search/SearchBar';

export default function Dashboard() {
  return (
    <div className="row">
      <div className="col">
        <PokemonList />
      </div>
    </div>
  );
}
