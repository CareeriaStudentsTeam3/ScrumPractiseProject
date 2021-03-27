import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/hairmodel/'

const create = async (newHairModel) => {
  const response = await axios.post(baseUrl, newHairModel)
  return response.data
}

export default { create }
