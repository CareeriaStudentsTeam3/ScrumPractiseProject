import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/hairmodel/'

let token = null

const setToken = (newToken) => {
  token = newToken.substr(10)
}

const getAll = async () => {
  const response = await axios.get(baseUrl, { withCredentials: true })
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}${id}/`, {
    withCredentials: true,
  })
  return response.data
}

const create = async (newHairModel) => {
  const response = await axios.post(baseUrl, newHairModel)
  return response.data
}

const update = async (updatedHairModel, id) => {
  console.log('token', token)
  const response = await axios.put(`${baseUrl}${id}/`, updatedHairModel, {
    withCredentials: true,
    headers: { 'X-CSRFToken': token },
  })
  return response.data
}

const del = async (id) => {
  const response = await axios.delete(`${baseUrl}${id}/`, {
    withCredentials: true,
    headers: { 'X-CSRFToken': token },
  })
  return response.data
}

export default { getAll, getOne, create, update, del, setToken }
