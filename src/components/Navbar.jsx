import React from 'react'
import { useAuth } from '../hooks/useAuth'
import '../styles/dashboard.css'

const Navbar = ({ title }) => {
  const { user } = useAuth()
  const now = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <div className="navbar">
      <div>
        <h3>{title}</h3>
        <p>{now}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '14px', color: '#888' }}>
          Welcome, <strong>{user?.name}</strong>
        </span>
        <div style={{
          width: '38px', height: '38px',
          background: 'linear-gradient(135deg, #533483, #e94560)',
          borderRadius: '50%', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: '700'
        }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  )
}

export default Navbar