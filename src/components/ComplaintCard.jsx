import React from 'react'
import { formatDate } from '../utils/formatDate'

const ComplaintCard = ({ complaint, onStatusChange, isAdmin }) => {
  const statusClass = `badge badge-${complaint.status?.toLowerCase()}`

  return (
    <div className="card" style={{ borderLeft: '4px solid #0f3460' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ marginBottom: '6px', color: '#1a1a2e' }}>{complaint.title}</h4>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
            {complaint.description}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {complaint.category && (
              <span style={{
                background: '#e8f4fd', color: '#0f3460',
                padding: '3px 10px', borderRadius: '12px', fontSize: '12px'
              }}>
                <i className="fas fa-tag"></i> {complaint.category}
              </span>
            )}
            <span style={{ fontSize: '12px', color: '#999' }}>
              <i className="fas fa-clock"></i> {formatDate(complaint.createdAt)}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
          <span className={statusClass}>{complaint.status}</span>
          {isAdmin && (
            <select
              value={complaint.status}
              onChange={(e) => onStatusChange(complaint.id, e.target.value)}
              style={{
                padding: '6px 10px', borderRadius: '6px',
                border: '1px solid #ddd', fontSize: '13px', cursor: 'pointer'
              }}
            >
              <option value="PENDING">PENDING</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          )}
        </div>
      </div>
    </div>
  )
}

export default ComplaintCard