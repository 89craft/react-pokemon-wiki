import React, { useState, useEffect } from 'react';
//import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

export default function Pokemon() {
  let { pokemonIndex } = useParams()

  const [name, setName] = useState('')
  //const [pokemonIndex, setPokemonIndex] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [types, setTypes] = useState([])
  const [description, setDescription] = useState('')
  const [statTitleWidth, setStatTitleWidth] = useState(3)
  const [statBarWidth, setStatBarWidth] = useState(9)
  const [stats, setStats] = useState({
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    specialAttack: '',
    specialDefense: ''
  })
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [eggGroups, setEggGroups] = useState('')
  const [catchRate, setCatchRate] = useState('')
  const [abilities, setAbilities] = useState('')
  const [genderRatioMale, setGenderRatioMale] = useState('')
  const [genderRatioFemale, setGenderRatioFemale] = useState('')
  const [evs, setEvs] = useState('')
  const [hatchSteps, setHatchSteps] = useState('')
  const [themeColor, setThemeColor] = useState('#EF5350')

  useEffect(() => {
    //setPokemonIndex(this.props.match.params)

    // Urls for pokemon information
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    // Get Pokemon Information
    //const pokemonRes = Axios.get(pokemonUrl);
    Axios.get(pokemonUrl).then(pokemonRes => {
      const name = pokemonRes.data.name;
      const imageUrl = pokemonRes.data.sprites.front_default;

      let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

      pokemonRes.data.stats.map(stat => {
        switch (stat.stat.name) {
          case 'hp':
            hp = stat['base_stat'];
            break;
          case 'attack':
            attack = stat['base_stat'];
            break;
          case 'defense':
            defense = stat['base_stat'];
            break;
          case 'speed':
            speed = stat['base_stat'];
            break;
          case 'special-attack':
            specialAttack = stat['base_stat'];
            break;
          case 'special-defense':
            specialDefense = stat['base_stat'];
            break;
          default:
            break;
        }
      });

      // Convert Decimeters to Feet... The + 0.0001 * 100 ) / 100 is for rounding to two decimal places :)
      const height =
        Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100;

      const weight =
        Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100;

      const types = pokemonRes.data.types.map(type => type.type.name);

      const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

      const abilities = pokemonRes.data.abilities
        .map(ability => {
          return ability.ability.name
            .toLowerCase()
            .split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })
        .join(', ');

      const evs = pokemonRes.data.stats
        .filter(stat => {
          if (stat.effort > 0) {
            return true;
          }
          return false;
        })
        .map(stat => {
          return `${stat.effort} ${stat.stat.name
            .toLowerCase()
            .split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')}`;
        })
        .join(', ');

      // Get Pokemon Description .... Is from a different end point uggh
      Axios.get(pokemonSpeciesUrl).then(res => {
        let description = '';
        res.data.flavor_text_entries.some(flavor => {
          if (flavor.language.name === 'en') {
            description = flavor.flavor_text;
            return;
          }
        });
        const femaleRate = res.data['gender_rate'];
        const genderRatioFemale = 12.5 * femaleRate;
        const genderRatioMale = 12.5 * (8 - femaleRate);

        const catchRate = Math.round((100 / 255) * res.data['capture_rate']);

        const eggGroups = res.data['egg_groups']
          .map(group => {
            return group.name
              .toLowerCase()
              .split(' ')
              .map(s => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ');
          })
          .join(', ');

        const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

        setDescription(description)
        setGenderRatioFemale(genderRatioFemale)
        setGenderRatioMale(genderRatioMale)
        setCatchRate(catchRate)
        setEggGroups(eggGroups)
        setHatchSteps(hatchSteps)
      });

      setImageUrl(imageUrl)
      //setPokemonIndex(pokemonIndex)
      setName(name)
      setTypes(types)
      setStats({
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      })
      setThemeColor(themeColor)
      setHeight(height)
      setWeight(weight)
      setAbilities(abilities)
      setEvs(evs)
    })
  }, [])

  return (
    <div className="col">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-5">
              <h5>{pokemonIndex}</h5>
            </div>
            <div className="col-7">
              <div className="float-end">
                {types.map(type => (
                  <span
                    key={type}
                    className="badge badge-pill me-1"
                    style={{
                      backgroundColor: `#${TYPE_COLORS[type]}`,
                      color: 'white'
                    }}
                  >
                    {type
                      .toLowerCase()
                      .split(' ')
                      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row align-items-center">
            <div className=" col-md-3 ">
              <img
                src={imageUrl}
                alt={name}
                className="card-img-top rounded mx-auto mt-2"
              />
            </div>
            <div className="col-md-9">
              <h4 className="mx-auto">
                {name
                  .toLowerCase()
                  .split(' ')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')}
              </h4>
              <div className="row align-items-center">
                <div className={`col-12 col-md-${statTitleWidth}`}>
                  HP
                </div>
                <div className={`col-12 col-md-${statBarWidth}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${stats.hp}%`,
                        backgroundColor: `#${themeColor}`
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{stats.hp}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className={`col-12 col-md-${statTitleWidth}`}>
                  Attack
                </div>
                <div className={`col-12 col-md-${statBarWidth}`}>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${stats.attack}%`,
                        backgroundColor: `#${themeColor}`
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{stats.attack}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className={`col-12 col-md-${statTitleWidth}`}>
                  Defense
                </div>
                <div className={`col-12 col-md-${statBarWidth}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${stats.defense}%`,
                        backgroundColor: `#${themeColor}`
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{stats.defense}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className={`col-12 col-md-${statTitleWidth}`}>
                  Speed
                </div>
                <div className={`col-12 col-md-${statBarWidth}`}>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${stats.speed}%`,
                        backgroundColor: `#${themeColor}`
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{stats.speed}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className={`col-12 col-md-${statTitleWidth}`}>
                  Sp Atk
                </div>
                <div className={`col-12 col-md-${statBarWidth}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${stats.specialAttack}%`,
                        backgroundColor: `#${themeColor}`
                      }}
                      aria-valuenow={stats.specialAttack}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{stats.specialAttack}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className={`col-12 col-md-${statTitleWidth}`}>
                  Sp Def
                </div>
                <div className={`col-12 col-md-${statBarWidth}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${stats.specialDefense}%`,
                        backgroundColor: `#${themeColor}`
                      }}
                      aria-valuenow={stats.specialDefense}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{stats.specialDefense}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col">
              <p className="">{description}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="card-body">
          <h5 className="card-title text-center">Profile</h5>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-6">
                  <h6 className="float-end">Height:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-start">{height} ft.</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-end">Weight:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-start">{weight} lbs</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-end">Catch Rate:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-start">{catchRate}%</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-end">Gender Ratio:</h6>
                </div>
                <div className="col-6">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${genderRatioFemale}%`,
                        backgroundColor: '#c2185b'
                      }}
                      aria-valuenow="15"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{genderRatioFemale}</small>
                    </div>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${genderRatioMale}%`,
                        backgroundColor: '#1976d2'
                      }}
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{genderRatioMale}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-6">
                  <h6 className="float-end">Egg Groups:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-start">{eggGroups} </h6>
                </div>
                <div className="col-6">
                  <h6 className="float-end">Hatch Steps:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-start">{hatchSteps}</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-end">Abilities:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-start">{abilities}</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-end">EVs:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-start">{evs}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">
          Data From{' '}
          <a 
            href="https://pokeapi.co/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="card-link"
          >
            PokeAPI.co
          </a>
        </div>
      </div>
    </div>
  );
}
