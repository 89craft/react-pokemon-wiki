import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import ItemCard from './ItemCard'
import Pagination from '../layout/Pagination'
import PokemonCard from '../pokemon/PokemonCard'

export default function PaginatedList({ category, pageLimit }) {
  if (!category) category = 'pokemon'
  if (!pageLimit) pageLimit = 9999

  const [items, setItems] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState(`https://pokeapi.co/api/v2/${category}?limit=${pageLimit}`)
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    Axios.get(currentPageUrl, {
      cancelToken: new Axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setItems(res.data.results)
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

  return (
    <>
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {category === 'pokemon' ? (
            <>
              {items.map(item => (
                <PokemonCard
                  key={item.name}
                  name={item.name}
                  url={item.url}
                />
              ))}
            </>
          ) : (
            <>
              {items.map(item => (
                <ItemCard
                  key={item.name}
                  category={category}
                  name={item.name}
                  url={item.url}
                />
              ))}
            </>
          )}
        </div>
      )}
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  )
}