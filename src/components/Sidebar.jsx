import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/dashboard.css'

const Sidebar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const studentLinks = [
    { to: '/student/dashboard',         icon: 'fa-home',          label: 'Dashboard' },
    { to: '/student/submit-complaint',  icon: 'fa-plus-circle',   label: 'Submit Complaint' },
    { to: '/student/complaints',        icon: 'fa-list',          label: 'My Complaints' },
    { to: '/student/profile',           icon: 'fa-user',          label: 'Profile' }
  ]

  const adminLinks = [
    { to: '/admin/dashboard',   icon: 'fa-tachometer-alt', label: 'Dashboard' },
    { to: '/admin/complaints',  icon: 'fa-exclamation-circle', label: 'All Complaints' }
  ]

  const links = user?.role === 'ADMIN' ? adminLinks : studentLinks

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon"><i className="fas fa-building"></i></div>
        <div>
          <h2>SmartHostel</h2>
          <p>{user?.role === 'ADMIN' ? 'Admin Panel' : 'Student Portal'}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <i className={`fas ${link.icon}`}></i>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <h4>{user?.name}</h4>
            <p>{user?.role}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar