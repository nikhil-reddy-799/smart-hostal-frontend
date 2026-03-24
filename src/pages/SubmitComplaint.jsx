import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar  from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'
import { submitComplaint } from '../services/complaintService'
import { toast } from 'react-toastify'

const SubmitComplaint = () => {
  const { token } = useAuth()
  const navigate  = useNavigate()
  const [form, setForm] = useState({ title: '', description: '', category: '' })
  const [loading, setLoading] = useState(false)

  const categories = ['Maintenance','Plumbing','Electrical','Internet','Mess','Furniture','Security','Other']

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      toast.error('Authentication token missing. Please login again.')
      return
    }
    
    setLoading(true)
    try {
      await submitComplaint(form, token)
      toast.success('Complaint submitted successfully!')
      navigate('/student/complaints')
    } catch (error) {
      console.error('Submit error:', error)
      const errorMsg = error.response?.data?.error || error.message || 'Failed to submit complaint'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Submit Complaint" />
        <div className="card" style={{ maxWidth: '600px' }}>
          <h3 style={{ marginBottom: '20px' }}>
            <i className="fas fa-plus-circle" style={{ color: '#0f3460', marginRight: '10px' }}></i>
            New Complaint
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Complaint Title *</label>
              <input type="text" name="title" placeholder="Brief title of your complaint"
                value={form.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea name="description" rows="5"
                placeholder="Describe your complaint in detail..."
                value={form.description} onChange={handleChange} required
                style={{ resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-primary" type="submit"
                style={{ width: 'auto' }} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Complaint'}
              </button>
              <button type="button" className="btn"
                style={{ background: '#f0f0f0', color: '#666', width: 'auto' }}
                onClick={() => navigate('/student/dashboard')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubmitComplaint