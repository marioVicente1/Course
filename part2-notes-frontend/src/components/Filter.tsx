import React from 'react'

const Filter = ({ handleOnChangeSearch, search }) => {
  return (
    <form>
      Filter shown with a
      <input onChange={handleOnChangeSearch} value={search} type="text" />
    </form>
  )
}

export default Filter
