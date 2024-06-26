import React from 'react'

const CountrySpecific = ({ country, weather }) => {
  console.log('🚀 ~ CountrySpecific ~ weather:', weather)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <br />
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        width="100"
      />

      {country.name.common === weather.location.country ? (
        <div>
          <h2>Weather in {country.name.common} </h2>
          <p>Temperature: {weather.current.temp_c} </p>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
          <p>Wind: {weather.current.wind_kph} km/h</p>
          <p>Pressure: {weather.current.pressure_mb}</p>
        </div>
      ) : null}
    </div>
  )
}

export default CountrySpecific
