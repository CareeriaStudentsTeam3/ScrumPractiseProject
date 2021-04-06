import axios from 'axios'

const serviceUrl = 'http://localhost:8000/api/service/'

const getAll = async () => {
  const response = await axios.get(serviceUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${serviceUrl}${id}/`)
  return response.data
}

export default { getAll, getOne }
