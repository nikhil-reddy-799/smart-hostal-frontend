import React, { useEffect, useState } from 'react'
import Sidebar  from '../components/Sidebar'
import Navbar   from '../components/Navbar'
import Footer   from '../components/Footer'
import { useAuth } from '../hooks/useAuth'
import { getAllComplaints, updateComplaintStatus } from '../services/complaintService'
import { toast } from 'react-toastify'

const StaffDashboard = () => {
  const { token, user } = useAuth()
  const [complaints, setComplaints] = useState([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    if (!token) {
      toast.error('Please login to access staff dashboard')
      setLoading(false)
      return
    }
    
    getAllComplaints(token)
      .then((c) => {
        setComplaints(c || [])
      }).catch((error) => {
        console.error('Dashboard error:', error)
        const errorMsg = error.response?.data?.message || error.message || 'Failed to load dashboard data'
        toast.error(errorMsg)
      })
      .finally(() => setLoading(false))
  }, [token])

  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaintStatus(id, status, token)
      setComplaints(prev => prev.map(c => c.id === id ? { ...c, status } : c))
      toast.success('Status updated!')
    } catch {
      toast.error('Failed to update status')
    }
  }

  const stats = [
    { label: 'Total Complaints', value: complaints.length,                                      icon: 'fa-list',          bg: '#e8f4fd', color: '#0f3460' },
    { label: 'Pending',          value: complaints.filter(c => c.status === 'PENDING').length,  icon: 'fa-hourglass-half',         bg: '#fff3cd', color: '#856404' },
    { label: 'In Progress',      value: complaints.filter(c => c.status === 'IN_PROGRESS').length, icon: 'fa-spinner',       bg: '#cce5ff', color: '#004085' },
    { label: 'Resolved',         value: complaints.filter(c => c.status === 'RESOLVED').length, icon: 'fa-check-circle',  bg: '#d4edda', color: '#155724' }
  ]

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Staff Dashboard" />

        <div className="welcome-banner">
          <div>
            <h2>Staff Control Panel 🛠️</h2>
            <p>Manage and resolve student complaints</p>
          </div>
          <div className="banner-icon">📋</div>
        </div>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
                <i className={`fas ${s.icon}`}></i>
              </div>
              <div className="stat-info">
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>Recent Complaints</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Title</th><th>Category</th>
                  <th>Status</th><th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.slice(0, 10).map((c, i) => (
                  <tr key={c.id}>
                    <td>{i + 1}</td>
                    <td>{c.title}</td>
                    <td>{c.category || 'General'}</td>
                    <td><span className={`badge badge-${c.status?.toLowerCase()}`}>{c.status}</span></td>
                    <td>
                      <select value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '13px' }}>
                        <option value="PENDING">PENDING</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default StaffDashboard
