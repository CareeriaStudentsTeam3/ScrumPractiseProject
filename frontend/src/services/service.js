import axios from 'axios'
import ownAxios from '../axiosConfig'

const serviceUrl = 'http://localhost:8000/api/service/'

const getFilter = async (groupSize) => {
  const response = await axios.get(`${serviceUrl}?group_size=${groupSize}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(serviceUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await ownAxios.get(`${serviceUrl}${id}/`)
  return response.data
}

const create = async (newService) => {
  const response = await ownAxios.post(serviceUrl, newService)
  return response.data
}

const update = async (id, updatedService) => {
  const response = await ownAxios.put(`${serviceUrl}${id}/`, updatedService)
  return response.data
}

const del = async (id) => {
  const response = await ownAxios.delete(`${serviceUrl}${id}/`)
  return response.data
}

export default { getFilter, getAll, getOne, create, update, del }
