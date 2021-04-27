import axios from '../axiosConfig'
import logoutService from './logout'

const timeSpanUrl = 'http://localhost:8000/api/appointment_timespan/'

const getFreeTimes = async (groupSize, duration) => {
  const response = await axios.get(
    `${timeSpanUrl}?group_size=${groupSize}&duration=${duration}`
  )
  return response.data
}

const getAll = async () => {
  try {
    const response = await axios.get(timeSpanUrl)
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
    const response = await axios.get(`${timeSpanUrl}${id}/`)
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

const create = async (newTime) => {
  try {
    const response = await axios.post(timeSpanUrl, newTime)
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

const update = async (id, updatedDate) => {
  try {
    const response = await axios.put(`${timeSpanUrl}${id}/`, updatedDate)
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

const del = async (id) => {
  try {
    const response = await axios.delete(`${timeSpanUrl}${id}/`)
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

export default { getFreeTimes, getAll, getOne, create, update, del }
