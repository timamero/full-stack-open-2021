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
  const [countryToShowDetails, setCountryToShowDetails] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const getCountryByName = (object) => object.name === countryToShowDetails;
  const indexOfCountry = countriesToShow.findIndex(getCountryByName)

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setCountryToShowDetails(countriesToShow[0].name)
    }
  }, [countriesToShow])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    console.log('weather effect')
    if (countryToShowDetails === '') {
      console.log('exit')
      return;
    }
    console.log('passed conditional')
    const params = {
      access_key: process.env.REACT_APP_WEATHERSTACK_KEY,
      query: countryToShowDetails
    }
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeatherData(response.data)
      })
  }, [countryToShowDetails])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    console.log('handleFilter')

    if (filter === '') {
      setCountryToShowDetails('')
      setWeatherData(null)
    }
    
  }
  
  const handleShowCountryChange = (event) => {
    setCountryToShowDetails(event.target.value)
  }
  console.log('length before render', countriesToShow.length)

  return (
    <div>
      <FilterForm value={filter} handleChange={handleFilterChange} />
      <div>
        {countriesToShow.length > 10 && filter !== ''
          ? <p>Too many matches, specify another filter</p>
          : countriesToShow.length !== 1 && filter !== ''
            ? countriesToShow.map(country => (
                <CountryListing key={country.name} name={country.name} handleChange={handleShowCountryChange}/>
              ))
          : null
        }
      </div>
      {countryToShowDetails && filter !== ''
        ? 
          <div>
            <CountryDetails country={countriesToShow[indexOfCountry]}/>
            {weatherData ? 
              <div>
                <h2>Weather in {weatherData.location.country}</h2>
                <p>Temperature: {weatherData.current.temperature} Celsius</p>
                <img src={weatherData.current.weather_icons} alt="Weather icon" />
                <p>Wind: {weatherData.current.wind_speed} kmh direction {weatherData.current.wind_dir}</p>
              </div> 
            : null}
          </div>
        : null}
    </div>
  );
}

export default App;
