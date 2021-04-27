import axios from '../axiosConfig'
import logoutService from './logout'

const baseUrl = 'http://localhost:8000/api/hairmodel/'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (err) {
    if (
      err.response.status === 403 &&
      err.response.data.detail.includes(
        'Authentication credentials were not provided.'
      )
    ) {
      window.localStorage.clear()
      logoutService.logout()
      return { error: true, status: err.response.status }
    }
    if (
      err.response.status === 403 &&
      err.response.data.detail.includes(
        'You do not have permission to perform this action.'
      )
    ) {
      return {
        error: true,
        status: err.response.status,
        detail: err.response.data.detail,
      }
    }
  }
}

const getOne = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}${id}/`)
    return response.data
  } catch (err) {
    if (
      err.response.status === 403 &&
      err.response.data.detail.includes(
        'Authentication credentials were not provided.'
      )
    ) {
      window.localStorage.clear()
      logoutService.logout()
      return { error: true, status: err.response.status }
    }
    if (
      err.response.status === 403 &&
      err.response.data.detail.includes(
        'You do not have permission to perform this action.'
      )
    ) {
      return {
        error: true,
        status: err.response.status,
        detail: err.response.data.detail,
      }
    }
  }
}

const create = async (newHairModel) => {
  const response = await axios.post(baseUrl, newHairModel)
  return response.data
}

const update = async (updatedHairModel, id) => {
  try {
    const response = await axios.put(`${baseUrl}${id}/`, updatedHairModel)
    return response.data
  } catch (err) {
    if (
      err.response.status === 403 &&
      err.response.data.detail.includes(
        'Authentication credentials were not provided.'
      )
    ) {
      window.localStorage.clear()
      logoutService.logout()
    }
    if (
      err.response.status === 403 &&
      err.response.data.detail.includes(
        'You do not have permission to perform this action.'
      )
    ) {
      return {
        error: true,
        status: err.response.status,
        detail: err.response.data.detail,
      }
    }
  }
}

const del = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}${id}/`)
    return response.data
  } catch (err) {
    if (
      err.response.status === 403 &&
      err.response.data.detail.includes(
        'Authentication credentials were not provided.'
      )
    ) {
      window.localStorage.clear()
      logoutService.logout()
    }
    if (
      err.response.status === 403 &&
      err.response.data.detail.includes(
        'You do not have permission to perform this action.'
      )
    ) {
      return {
        error: true,
        status: err.response.status,
        detail: err.response.data.detail,
      }
    }
  }
}

export default { getAll, getOne, create, update, del }
