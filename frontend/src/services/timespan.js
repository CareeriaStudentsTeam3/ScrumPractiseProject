import axios from 'axios'

const timeSpanUrl = 'http://localhost:8000/api/appointment_timespan/'

const getFreeTimes = async (groupSize, duration) => {
  const response = await axios.get(
    `${timeSpanUrl}?group_size=${groupSize}&duration=${duration}`
  )
  return response.data
}

const getAll = async () => {
  const response = await axios.get(timeSpanUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${timeSpanUrl}${id}/`)
  return response.data
}

const create = async (newTime) => {
  const response = await axios.post(timeSpanUrl, newTime)
  return response.data
}

const del = async (id) => {
  const response = await axios.delete(`${timeSpanUrl}${id}/`)
  return response.data
}

export default { getFreeTimes, getAll, getOne, create, del }
