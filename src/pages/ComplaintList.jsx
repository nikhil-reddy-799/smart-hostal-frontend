import React, { useEffect, useState, useMemo } from 'react'
import Sidebar        from '../components/Sidebar'
import Navbar         from '../components/Navbar'
import ComplaintCard  from '../components/ComplaintCard'
import { useAuth }    from '../hooks/useAuth'
import { getMyComplaints, getAllComplaints, updateComplaintStatus } from '../services/complaintService'
import { toast } from 'react-toastify'

const ComplaintList = () => {
  const { user, token } = useAuth()
  const isAdmin = user?.role === 'ADMIN'
  const [complaints, setComplaints] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [filter,     setFilter]     = useState('ALL')

  const filtered = useMemo(() => {
    return filter === 'ALL'
      ? complaints
      : complaints.filter(c => c.status === filter)
  }, [filter, complaints])

  useEffect(() => {
    if (!token) {
      toast.error('Please login to view complaints')
      setLoading(false)
      return
    }
    
    const fetch = isAdmin ? getAllComplaints : getMyComplaints
    fetch(token)
      .then(data => setComplaints(data || []))
      .catch((error) => {
        console.error('Fetch error:', error)
        const errorMsg = error.response?.data?.message || error.message || 'Failed to load complaints'
        toast.error(errorMsg)
      })
      .finally(() => setLoading(false))
  }, [token, user, isAdmin])

  const handleStatusChange = async (id, status) => {
    if (!token) {
      toast.error('Authentication token missing. Please login again.')
      return
    }
    
    try {
      await updateComplaintStatus(id, status, token)
      setComplaints(prev => prev.map(c => c.id === id ? { ...c, status } : c))
      toast.success('Status updated!')
    } catch (error) {
      console.error('Status update error:', error)
      const errorMsg = error.response?.data?.error || error.message || 'Failed to update status'
      toast.error(errorMsg)
    }
  }

  const statuses = ['ALL', 'PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED']

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title={isAdmin ? 'All Complaints' : 'My Complaints'} />

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {statuses.map(s => (
            <button key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '8px 16px', borderRadius: '20px', border: 'none',
                cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                background: filter === s ? '#0f3460' : '#e8f4fd',
                color: filter === s ? 'white' : '#0f3460',
                transition: 'all 0.2s'
              }}>
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">Loading complaints...</div>
        ) : filtered.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <i className="fas fa-inbox" style={{ fontSize: '48px', color: '#ddd' }}></i>
            <p style={{ marginTop: '16px', color: '#888' }}>No complaints found</p>
          </div>
        ) : (
          filtered.map(c => (
            <ComplaintCard
              key={c.id}
              complaint={c}
              isAdmin={isAdmin}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default ComplaintList