import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/login/'

const logIn = async (credentials) => {
  const response = await axios.post(baseUrl, credentials, {
    withCredentials: true,
  })
  return response.data
}

export default { logIn }
