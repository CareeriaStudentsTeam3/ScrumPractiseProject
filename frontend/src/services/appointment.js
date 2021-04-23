import axios from '../axiosConfig'
import logoutService from './logout'

const appointmentUrl = 'http://localhost:8000/api/appointment/'

const getAll = async () => {
  try {
    const response = await axios.get(appointmentUrl)
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
    const response = await axios.get(`${appointmentUrl}${id}/`)
    return response.data
  } catch (err) {
    if (err.response.status === 403) {
      window.localStorage.clear()
      logoutService.logout()
      return { error: true, status: err.response.status }
    }
  }
}

const create = async (newAppointment) => {
  const response = await axios.post(appointmentUrl, newAppointment)
  return response.data
}

const update = async (updatedAppointment, id) => {
  try {
    const response = await axios.put(
      `${appointmentUrl}${id}/`,
      updatedAppointment
    )
    return response.data
  } catch (err) {
    if (err.response.status === 403) {
      window.localStorage.clear()
      logoutService.logout()
    }
  }
}

const del = async (id) => {
  try {
    const response = await axios.delete(`${appointmentUrl}${id}/`)
    return response.data
  } catch (err) {
    if (err.response.status === 403) {
      window.localStorage.clear()
      logoutService.logout()
    }
  }
}

export default { getAll, getOne, create, update, del }
