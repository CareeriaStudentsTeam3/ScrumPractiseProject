import axios from '../axiosConfig'
import logoutService from './logout'

const serviceUrl = 'http://localhost:8000/api/service/'

const getFilter = async (groupSize) => {
  const response = await axios.get(`${serviceUrl}?group_size=${groupSize}`)
  return response.data
}

const getAll = async () => {
  try {
    const response = await axios.get(serviceUrl)
    return response.data
  } catch (err) {
    if (err.response.status === 403) {
      window.localStorage.clear()
      logoutService.logout()
      return { error: true, status: err.response.status }
    }
  }
}

const getOne = async (id) => {
  try {
    const response = await axios.get(`${serviceUrl}${id}/`)
    return response.data
  } catch (err) {
    if (err.response.status === 403) {
      window.localStorage.clear()
      logoutService.logout()
      return { error: true, status: err.response.status }
    }
  }
}

const create = async (newService) => {
  try {
    const response = await axios.post(serviceUrl, newService)
    return response.data
  } catch (err) {
    if (err.response.status === 403) {
      window.localStorage.clear()
      logoutService.logout()
      return { error: true, status: err.response.status }
    }
  }
}

const update = async (id, updatedService) => {
  try {
    const response = await axios.put(`${serviceUrl}${id}/`, updatedService)
    return response.data
  } catch (err) {
    if (err.response.status === 403) {
      window.localStorage.clear()
      logoutService.logout()
      return { error: true, status: err.response.status }
    }
  }
}

const del = async (id) => {
  try {
    const response = await axios.delete(`${serviceUrl}${id}/`)
    return response.data
  } catch (err) {
    if (err.response.status === 403) {
      window.localStorage.clear()
      logoutService.logout()
      return { error: true, status: err.response.status }
    }
  }
}

export default { getFilter, getAll, getOne, create, update, del }
