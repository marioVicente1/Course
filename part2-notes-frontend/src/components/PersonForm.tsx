import React from 'react'

export const PersonForm = ({
  handleSubmit,
  newName,
  handleOnChange,
  newPhone,
  handleOnChangePhone
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleOnChange} />
      </div>
      <br />
      <div>
        phone:{' '}
        <input value={newPhone} onChange={handleOnChangePhone} type="text" />
      </div>
      <br />
      <button type="submit">add</button>
    </form>
  )
}
