import React from 'react'

const Persons = ({ filteredPersons, onclickRemove }) => {
  return (
    <div>
      {filteredPersons.map((item, index) => (
        <li key={index}>
          {item.name}, {item.phone}{' '}
          <button onClick={() => onclickRemove(item.id, item.name)}>
            Delete
          </button>
        </li>
      ))}
    </div>
  )
}

export default Persons
