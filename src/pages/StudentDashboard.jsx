import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar  from '../components/Sidebar'
import Navbar   from '../components/Navbar'
import Footer   from '../components/Footer'
import { useAuth } from '../hooks/useAuth'
import { getMyComplaints } from '../services/complaintService'
import { toast } from 'react-toastify'

const StudentDashboard = () => {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      toast.error('Please login to access dashboard')
      setLoading(false)
      return
    }
    
    getMyComplaints(token)
      .then(data => setComplaints(data || []))
      .catch((error) => {
        console.error('Dashboard error:', error)
        const errorMsg = error.response?.data?.message || error.message || 'Failed to load complaints'
        toast.error(errorMsg)
      })
      .finally(() => setLoading(false))
  }, [token])

  const counts = {
    total:       complaints.length,
    pending:     complaints.filter(c => c.status === 'PENDING').length,
    inProgress:  complaints.filter(c => c.status === 'IN_PROGRESS').length,
    resolved:    complaints.filter(c => c.status === 'RESOLVED').length
  }

  const stats = [
    { label: 'Total Complaints', value: counts.total,      icon: 'fa-list',             bg: '#e8f4fd', color: '#0f3460' },
    { label: 'Pending',          value: counts.pending,     icon: 'fa-clock',            bg: '#fff3cd', color: '#856404' },
    { label: 'In Progress',      value: counts.inProgress,  icon: 'fa-spinner',          bg: '#cce5ff', color: '#004085' },
    { label: 'Resolved',         value: counts.resolved,    icon: 'fa-check-circle',     bg: '#d4edda', color: '#155724' }
  ]

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Student Dashboard" />

        <div className="welcome-banner">
          <div>
            <h2>Welcome back, {user?.name}! 👋</h2>
            <p>Manage your hostel complaints and stay updated</p>
          </div>
          <div className="banner-icon">🏠</div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>Quick Actions</h3>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ width: 'auto' }}
              onClick={() => navigate('/student/submit-complaint')}>
              <i className="fas fa-plus"></i> Submit New Complaint
            </button>
            <button className="btn" style={{ background: '#e8f4fd', color: '#0f3460', width: 'auto' }}
              onClick={() => navigate('/student/complaints')}>
              <i className="fas fa-list"></i> View My Complaints
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : complaints.length > 0 && (
          <div className="card">
            <h3>Recent Complaints</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.slice(0, 5).map(c => (
                    <tr key={c.id}>
                      <td>{c.title}</td>
                      <td>{c.category || 'General'}</td>
                      <td><span className={`badge badge-${c.status?.toLowerCase()}`}>{c.status}</span></td>
                      <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  )
}

export default StudentDashboard