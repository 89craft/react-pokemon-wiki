import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import PokemonCard from './PokemonCard'
import Pagination from '../layout/Pagination'

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState(`https://pokeapi.co/api/v2/pokemon`)
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [pageLimit, setPageLimit] = useState(24)

  useEffect(() => {
    setLoading(true)
    let cancel
    Axios.get(currentPageUrl, {
      cancelToken: new Axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results)
    })

    return () => {
      cancel()
    }
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  function changePageLimit(event) {
    setPageLimit(event.target.value)
  }
  function handlePageLimit(event) {
    event.preventDefault()
    setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon?limit=${event.target.value}`)
  }

  return (
    <React.Fragment>
      <form className="mb-4" onSubmit={handlePageLimit}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Page Limit:</span>
          </div>
          <input type="number" value={pageLimit} step="12" min="12" className="form-control" onChange={changePageLimit} />
          <input type="submit" value="Update" className="btn btn-success" />
        </div>
      </form>
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {pokemon.map(pokemon => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </div>
      )}
    </React.Fragment>
  )
}