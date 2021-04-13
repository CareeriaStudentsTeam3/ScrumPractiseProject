import axios from 'axios'
import ownAxios from '../axiosConfig'

const baseUrl = 'http://localhost:8000/api/hairmodel/'

const getAll = async () => {
  try {
    const response = await ownAxios.get(baseUrl)
    return response.data
  } catch (error) {
    return { error: true, error_message: error.message }
  }
}

const getOne = async (id) => {
  try {
    const response = await ownAxios.get(`${baseUrl}${id}/`)
    return response.data
  } catch (error) {
    return { error: true, error_message: error.message }
  }
}

const create = async (newHairModel) => {
  const response = await axios.post(baseUrl, newHairModel)
  return response.data
}

const update = async (updatedHairModel, id) => {
  const response = await ownAxios.put(`${baseUrl}${id}/`, updatedHairModel)
  return response.data
}

const del = async (id) => {
  const response = await ownAxios.delete(`${baseUrl}${id}/`)
  return response.data
}

export default { getAll, getOne, create, update, del }
