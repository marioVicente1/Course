import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
  return axios.get(baseUrl)
}
const create = personObject => {
  return axios.post(baseUrl, personObject)
}

const update = (id, personObject) => {
  return axios.put(`${baseUrl}/${id}`, personObject)
}
const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}
export default {
  getAll: getAll,
  create: create,
  remove: remove,
  update: update
}
