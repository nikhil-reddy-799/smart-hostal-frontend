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

export const submitComplaint = async (data, token) => {
  try {
    const response = await axios.post(`${API}/complaints`, data, getHeaders(token))
    return response.data
  } catch (error) {
    console.error('Error submitting complaint:', error)
    throw error
  }
}

export const getMyComplaints = async (token) => {
  try {
    const response = await axios.get(`${API}/complaints/my`, getHeaders(token))
    return response.data || []
  } catch (error) {
    console.error('Error fetching my complaints:', error)
    throw error
  }
}

export const getAllComplaints = async (token) => {
  try {
    const response = await axios.get(`${API}/complaints/all`, getHeaders(token))
    return response.data || []
  } catch (error) {
    console.error('Error fetching all complaints:', error)
    throw error
  }
}

export const updateComplaintStatus = async (id, status, token) => {
  try {
    const response = await axios.put(
      `${API}/complaints/${id}/status?status=${status}`,
      {},
      getHeaders(token)
    )
    return response.data
  } catch (error) {
    console.error('Error updating complaint status:', error)
    throw error
  }
}