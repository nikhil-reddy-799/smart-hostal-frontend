import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar  from '../components/Navbar'
import Footer  from '../components/Footer'
import { useAuth } from '../hooks/useAuth'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="My Profile" />
        <div className="card" style={{ maxWidth: '500px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '80px', height: '80px', margin: '0 auto 12px',
              background: 'linear-gradient(135deg, #0f3460, #533483)',
              borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '32px', color: 'white', fontWeight: '700'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h3>{user?.name}</h3>
            <span className="badge badge-resolved">{user?.role}</span>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { icon: 'fa-user',     label: 'Full Name', value: user?.name },
              { icon: 'fa-envelope', label: 'Email',     value: user?.email },
              { icon: 'fa-shield',   label: 'Role',      value: user?.role }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '16px', background: '#f8f9fa', borderRadius: '10px'
              }}>
                <div style={{
                  width: '42px', height: '42px',
                  background: '#e8f4fd', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0f3460', fontSize: '18px'
                }}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#888' }}>{item.label}</p>
                  <p style={{ fontWeight: '600', color: '#1a1a2e' }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Profile