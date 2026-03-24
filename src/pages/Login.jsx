import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { loginUser } from '../services/authService'
import { toast } from 'react-toastify'

const Login = () => {
  const [form, setForm]       = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login }  = useAuth()
  const navigate   = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await loginUser(form)
      login({ name: data.name, email: data.email, role: data.role }, data.token)
      toast.success('Login successful!')
      if (data.role === 'ADMIN') navigate('/admin/dashboard')
      else navigate('/student/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '60px', height: '60px', margin: '0 auto 12px',
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            borderRadius: '16px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', color: 'white'
          }}>
            <i className="fas fa-building"></i>
          </div>
          <h2>SmartHostel</h2>
          <p className="subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email" name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password" name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange} required
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  )
}

export default Login