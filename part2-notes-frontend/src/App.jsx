import { useEffect, useState } from 'react'
// import Filter from './components/Filter'
// import { PersonForm } from './components/PersonForm'
import axios from 'axios'
// import Persons from './components/Persons'
import service from './services/persons'
import Persons from './services/persons'
import Country from './components/Persons'
import Countries from './components/Persons'
import CountrySpecific from './components/CountrySpecific'

const App = () => {
  const [countries, setcountries] = useState([])
  console.log('🚀 ~ App ~ countries:', countries)
  const [search, setsearch] = useState('')
  console.log('🚀 ~ App ~ search:', search)

  const [countryWeather, setcountryWeather] = useState({})
  console.log('🚀 ~ App ~ countryWeather:', countryWeather)

  const apiKey = '4e0a44e9d6b446e1b9524424242606'
  const baseUrl = 'http://api.weatherapi.com/v1'
  const city = 'Ecuador'
  const endpoint = `${baseUrl}/current.json?key=${apiKey}&q=${city}`

  const handleOnchange = e => {
    setsearch(e.target.value)
  }

  useEffect(() => {
    service.getAll().then(response => {
      // console.log('🚀 ~ useEffect ~ response:', response)
      setcountries(response.data)
    })
    axios
      .get(endpoint)
      .then(response => {
        setcountryWeather(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const searchCountry = search
    ? countries.filter(country => country?.name.common.includes(search))
    : []
  console.log('🚀 ~ App ~ serchCountry:', searchCountry)

  const onClick = name => {
    setsearch(name)
  }
  return (
    <div>
      <h1> Find your Country</h1>
      <div>
        Find countries <input value={search} onChange={handleOnchange} />
      </div>
      {searchCountry.length > 10 ? (
        'Too many matches, specify another filter'
      ) : searchCountry.length > 1 ? (
        <Countries filteredPersons={searchCountry} onClick={onClick} />
      ) : searchCountry.length === 1 ? (
        <CountrySpecific country={searchCountry[0]} weather={countryWeather} />
      ) : null}
    </div>
  )
}

export default App
