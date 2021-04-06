import axios from 'axios'

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
  const response = await axios.get(`${serviceUrl}${id}/`)
  return response.data
}

export default { getFilter, getAll, getOne }
