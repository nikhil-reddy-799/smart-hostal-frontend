import axios from 'axios'
import config from '../config'

const API = config.API_BASE_URL

const getHeaders = (token) => {
  if (!token) {
    throw new Error('Authentication token is missing. Please login first.')
  }
  return {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
}

export const getAllStudents = async (token) => {
  try {
    const response = await axios.get(`${API}/admin/students`, getHeaders(token))
    return response.data || []
  } catch (error) {
    console.error('Error fetching students:', error)
    throw error
  }
}

export const getAllStaff = async (token) => {
  try {
    const response = await axios.get(`${API}/admin/staff`, getHeaders(token))
    return response.data || []
  } catch (error) {
    console.error('Error fetching staff:', error)
    throw error
  }
}

export const addStaff = async (data, token) => {
  try {
    const response = await axios.post(`${API}/admin/staff`, data, getHeaders(token))
    return response.data
  } catch (error) {
    console.error('Error adding staff:', error)
    throw error
  }
}

export const deleteStudent = async (id, token) => {
  try {
    const response = await axios.delete(`${API}/admin/students/${id}`, getHeaders(token))
    return response.data
  } catch (error) {
    console.error('Error deleting student:', error)
    throw error
  }
}

export const deleteStaff = async (id, token) => {
  try {
    const response = await axios.delete(`${API}/admin/staff/${id}`, getHeaders(token))
    return response.data
  } catch (error) {
    console.error('Error deleting staff:', error)
    throw error
  }
}