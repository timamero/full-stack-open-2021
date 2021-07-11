import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FilterForm = ({value, handleChange}) => {
  return (
    <form>
        Find countries: <input value={value} onChange={handleChange} />
    </form>
  )
}

const CountryDetails = ({country}) => {
  console.log(country.name)
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>Languages</h3>
      {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      <img src={country.flag} alt="Country flag" style={{width: "100px"}}/>
    </div>
  )
}

const CountryListing = ({name, handleChange}) => {
  return (
    <li>
      {name}
      <button type="submit" value={name} onClick={handleChange}>show</button>
    </li>
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountryFromList, setShowCountryFromList] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    if (filter === '') {
      setShowCountryFromList('')
    }
  }

  const handleShowCountryChange = (event) => {
    setShowCountryFromList(event.target.value)
  }
  
  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const getCountryByName = (object) => object.name === showCountryFromList;

  const indexOfCountry = countriesToShow.findIndex(getCountryByName)
  console.log(filter)
  if (countriesToShow.length < 11) {
    console.log('countriesToShow', countriesToShow)
  }
  
  console.log('showCountryFromList', showCountryFromList)
  console.log('index', indexOfCountry)
  return (
    <div>
      <FilterForm value={filter} handleChange={handleFilterChange} />
      <div>
        {countriesToShow.length > 10 && filter !== ''
          ? <p>Too many matches, specify another filter</p>
          : filter !== ''
            ? countriesToShow.length === 1
            ? <CountryDetails country={countriesToShow[0]} />
            : countriesToShow.map(country => (
                <CountryListing key={country.name} name={country.name} handleChange={handleShowCountryChange}/>
              ))
          : null
        }
      </div>
      <div>
        {showCountryFromList !== '' && filter !== ''
        ? <CountryDetails country={countriesToShow[indexOfCountry]} />
        : null}
      </div>
    </div>
  );
}

export default App;
