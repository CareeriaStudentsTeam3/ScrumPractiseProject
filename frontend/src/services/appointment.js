import axios from 'axios'

const appointmentUrl = 'http://localhost:8000/api/appointment/'

const create = async (newAppointment) => {
  const response = await axios.post(appointmentUrl, newAppointment)
  return response.data
}

export default { create }
