import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { buildPathName, capName, getUrlId } from '../../scripts/helpers'
import spinner from '../layout/spinner.gif'

const Sprite = styled.img`
	width: 9em;
	height: 9em;
	display: none;
	image-rendering: pixelated;
`

const Card = styled.div`
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	&:hover {
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	}
	-moz-user-select: none;
	-website-user-select: none;
	-ms-user-select: none;
	user-select: none;
	-o-user-select: none;
`

const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;

	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
`

/* function getAverageColor(imageElement, ratio) {
  const canvas = document.createElement("canvas")

  let height = canvas.height = imageElement.naturalHeight
  let width = canvas.width = imageElement.naturalWidth

  const context = canvas.getContext("2d")
  context.drawImage(imageElement, 0, 0)

  let data, length
  let i = -4, count = 0

  try {
    data = context.getImageData(0, 0, width, height)
    length = data.data.length
  } catch (err) {
    console.error(err)
    return { R: 0, G: 0, B: 0 }
  }
  let R, G, B
  R = G = B = 0

  while ((i += ratio * 4) < length) {
    ++count

    R += data.data[i]
    G += data.data[i + 1]
    B += data.data[i + 2]
  }

  R = ~~(R / count)
  G = ~~(G / count)
  B = ~~(B / count)

  return { R, G, B }
} */

export default function PokemonCard({ name, url }) {
	const [imageLoading, setImageLoading] = useState(true)
	const [imageError, setImageError] = useState(false)

	const pokemonId = getUrlId(url)
	const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonId}.png?raw=true`

	function handleImageLoaded(event) {
		setImageLoading(false)

		/* const { R, G, B } = getAverageColor(element.target, 4)
    //document.body.style.background = `rgb(${R}, ${G}, ${B})`
    console.log(`rgb(${R}, ${G}, ${B})`) */
	}

	function handleImageError(event) {
		event.target.onerror = null
		// event.target.style.display = 'none'
		setImageError(true)
		setImageLoading(false)
	}

	return (
		<div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-8 mx-sm-0 mx-auto my-3">
			<StyledLink to={buildPathName(`/pokemon/${pokemonId}`)}>
				<Card className="card">
					<h5 className="card-header">
						{`#${pokemonId} - ${capName(name)}`}
					</h5>
					{imageLoading && (
						<img
							src={spinner}
							alt="loading"
							style={{
								width: '9em',
								height: '9em',
								imageRendering: 'pixelated',
							}}
							className="card-img-top rounded mx-auto d-block my-2"
						/>
					)}
					<Sprite
						src={imageUrl}
						alt={name}
						onLoad={handleImageLoaded}
						onError={handleImageError}
						className="card-img-top rounded mx-auto my-2"
						style={
							imageError
								? { display: 'none' }
								: imageLoading
								? null
								: { display: 'block' }
						}
					/>
					{imageError && (
						<h6 className="mx-auto">
							<span
								className="badge badge-danger mt-2"
								style={{
									backgroundColor: `#778`,
									color: 'white',
								}}
							>
								Image not Found
							</span>
						</h6>
					)}
					{/* <div className="card-body mx-auto">
            <h6 className="card-title">
              {capName(name)}
            </h6>
          </div> */}
				</Card>
			</StyledLink>
		</div>
	)
}
