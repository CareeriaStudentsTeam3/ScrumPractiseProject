import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/hairmodel/'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newHairModel) => {
  const response = await axios.post(baseUrl, newHairModel)
  return response.data
}

export default { getAll, create }
