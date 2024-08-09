import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import { PersonForm } from './components/PersonForm'
import Persons from './components/Persons'
import service from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setnewPhone] = useState('')
  const [search, setSearch] = useState('')
  const [createdSuccess, setcreatedSuccess] = useState('')
  const [modifiedSuccess, setmodifiedSuccess] = useState('')
  const [errorMessage, seterrorMessage] = useState('')

  const handleOnChangeSearch = e => {
    setSearch(e.target.value)
  }

  const handleOnChange = e => {
    setNewName(e.target.value)
  }
  const handleOnChangePhone = e => {
    setnewPhone(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const personObject = {
      name: newName,
      phone: newPhone
    }
    const personExist = persons.find(person => person.name === newName)
    if (personExist) {
      if (personExist.phone !== newPhone) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const updatePersons = { ...personExist, phone: newPhone }
          service
            .update(personExist.id, updatePersons)
            .then(response => {
              setPersons(
                persons.map(person =>
                  person.id !== personExist.id ? person : response.data
                )
              )
              setNewName('')
              setnewPhone('')
              setmodifiedSuccess(
                `The phone of ${personExist.name} modified with successs`
              )
              setTimeout(() => {
                setmodifiedSuccess('')
              }, 4000)
            })
            .catch(error => {
              seterrorMessage(
                'The information of user has already been removed from server'
              )
              setTimeout(() => {
                seterrorMessage('')
              }, 4000)
            })
        }
      } else {
        window.confirm(
          `${newName} is already added to phonebook with the same number.`
        )
      }
    } else {
      service.create(personObject).then(response => {
        setPersons([...persons, response.data])
        setNewName('')
        setnewPhone('')
        setcreatedSuccess(`Added ${newName} `)
        setTimeout(() => {
          setcreatedSuccess(null)
        }, 4000)
      })
    }
  }

  useEffect(() => {
    service.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const onclickRemove = (id, name) => {
    if (window.confirm(`Do you really want to delete this contact ${name}?`)) {
      service.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }
  const filteredPersons = persons.filter(person =>
    person?.name?.toLowerCase().includes(search.toLowerCase())
  )
  const successMessage = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    background: 'lightblue',
    width: 300
  }
  const errorstyleMessage = {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 16,
    background: 'red',
    width: 300
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div style={successMessage}>
        {createdSuccess && createdSuccess}
        {modifiedSuccess && modifiedSuccess}
      </div>
      <div style={errorstyleMessage}>{errorMessage && errorMessage}</div>

      <Filter handleOnChangeSearch={handleOnChangeSearch} search={search} />

      <h1>Add New</h1>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleOnChange={handleOnChange}
        newPhone={newPhone}
        handleOnChangePhone={handleOnChangePhone}
      />

      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        onclickRemove={onclickRemove}
      />
    </div>
  )
}

export default App
