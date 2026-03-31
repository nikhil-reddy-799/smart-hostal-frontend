import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Login            from '../pages/Login'
import Register         from '../pages/Register'
import Home             from '../pages/Home'
import StudentDashboard from '../pages/StudentDashboard'
import AdminDashboard   from '../pages/AdminDashboard'
import StaffDashboard   from '../pages/StaffDashboard'
import SubmitComplaint  from '../pages/SubmitComplaint'
import ComplaintList    from '../pages/ComplaintList'
import Profile          from '../pages/Profile'

const ProtectedRoute = ({ children, role, roles }) => {
  const { user, token } = useAuth()
  if (!token) return <Navigate to="/login" />
  
  const allowedRoles = roles || (role ? [role] : [])
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" />
  }
  return children
}

const AppRoutes = () => {
  const { user, token } = useAuth()

  return (
    <Routes>
      <Route path="/"        element={<Home />}
      />
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Routes */}
      <Route path="/student/dashboard" element={
        <ProtectedRoute role="STUDENT"><StudentDashboard /></ProtectedRoute>
      }/>
      <Route path="/student/complaints" element={
        <ProtectedRoute role="STUDENT"><ComplaintList /></ProtectedRoute>
      }/>
      <Route path="/student/submit-complaint" element={
        <ProtectedRoute role="STUDENT"><SubmitComplaint /></ProtectedRoute>
      }/>
      <Route path="/student/profile" element={
        <ProtectedRoute role="STUDENT"><Profile /></ProtectedRoute>
      }/>

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>
      }/>
      <Route path="/admin/complaints" element={
        <ProtectedRoute roles={['ADMIN']}><ComplaintList /></ProtectedRoute>
      }/>

      {/* Staff Routes */}
      <Route path="/staff/dashboard" element={
        <ProtectedRoute role="STAFF"><StaffDashboard /></ProtectedRoute>
      }/>
      <Route path="/staff/complaints" element={
        <ProtectedRoute role="STAFF"><ComplaintList /></ProtectedRoute>
      }/>
    </Routes>
  )
}

export default AppRoutes