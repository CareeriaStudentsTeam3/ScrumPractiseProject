// import axios from 'axios'
import ownAxios from '../axiosConfig'

const baseUrl = 'http://localhost:8000/api/logout/'

const logout = async () => {
  const response = await ownAxios.post(baseUrl)
  return response.data
}

export default { logout }
