import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import { PersonForm } from './components/PersonForm'
import Persons from './components/Persons'
import service from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  console.log('🚀 ~ App ~ persons:', persons.length)
  const [newName, setNewName] = useState('')
  const [newPhone, setnewPhone] = useState('')
  const [search, setSearch] = useState('')

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
      phone: newPhone,
      id: `${persons.length + 1}`
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
          service.update(personExist.id, updatePersons).then(response => {
            setPersons(
              persons.map(person =>
                person.id !== personExist.id ? person : response.data
              )
            )
            setNewName('')
            setnewPhone('')
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
      })
    }
  }

  useEffect(() => {
    console.log('effect')
    service.getAll().then(response => {
      console.log('promise fulfilled', response)
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
    person?.name.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div>
      <h2>Phonebook</h2>
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
