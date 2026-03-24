import axios from 'axios'
import config from '../config'

const API = config.API_BASE_URL

export const registerUser = async (data) => {
  const response = await axios.post(`${API}/auth/register`, data)
  return response.data
}

export const loginUser = async (data) => {
  const response = await axios.post(`${API}/auth/login`, data)
  return response.data
}