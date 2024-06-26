import React from 'react'

const Countries = ({ filteredPersons, onClick }) => {
  return (
    <div>
      {filteredPersons.map((item, index) => (
        <div key={index} style={{ display: 'flex' }}>
          <li>{item.name.common},</li>{' '}
          <button onClick={() => onClick(item.name.common)}>show</button>
        </div>
      ))}
    </div>
  )
}

export default Countries
