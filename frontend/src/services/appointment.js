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

const create = async (newAppointment) => {
  const response = await axios.post(appointmentUrl, newAppointment)
  return response.data
}

export default { getAll, create }
