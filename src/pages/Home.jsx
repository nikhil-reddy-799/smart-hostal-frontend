import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Home component for the Smart Hostel Management System.
 * Provides an entry point for students and administrators.
 */
const Home = () => {
  const { token, user } = useAuth();

  const containerStyle = {
    fontFamily: "'Poppins', 'Inter', sans-serif",
    color: '#1a202c',
    backgroundColor: '#f4f7fe',
    minHeight: '100vh',
    lineHeight: '1.6',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 5%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  };

  const heroStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '100px 20px',
    background: 'radial-gradient(circle at top right, #533483, #0f3460)',
    color: 'white',
    clipPath: 'ellipse(150% 100% at 50% 0%)',
    marginBottom: '40px',
  };

  const buttonPrimary = {
    backgroundColor: '#e94560',
    color: 'white',
    padding: '14px 32px',
    borderRadius: '50px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 4px 15px rgba(233, 69, 96, 0.4)',
  };

  const buttonSecondary = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    padding: '14px 32px',
    borderRadius: '50px',
    fontWeight: '600',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(5px)',
    marginLeft: '15px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  };

  const dashboardPath = user?.role === 'ADMIN' 
    ? '/admin/dashboard' 
    : user?.role === 'STAFF' 
      ? '/staff/dashboard' 
      : '/student/dashboard';

  const FeatureCard = ({ icon, title, desc }) => {
    const [hover, setHover] = useState(false);
    return (
      <div 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          padding: '40px 30px',
          backgroundColor: '#fff',
          borderRadius: '20px',
          boxShadow: hover ? '0 20px 40px rgba(0,0,0,0.08)' : '0 10px 20px rgba(0,0,0,0.02)',
          transform: hover ? 'translateY(-10px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
          textAlign: 'center',
          border: '1px solid #edf2f7'
        }}
      >
        <div style={{
          fontSize: '40px',
          color: '#0f3460',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #f6f9fc, #eef2f7)',
          width: '80px',
          height: '80px',
          lineHeight: '80px',
          borderRadius: '50%',
          margin: '0 auto 20px'
        }}>
          <i className={`fas ${icon}`}></i>
        </div>
        <h3 style={{ marginBottom: '15px', color: '#1a1a2e' }}>{title}</h3>
        <p style={{ color: '#718096', fontSize: '0.95rem' }}>{desc}</p>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <nav style={navStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fas fa-building" style={{ fontSize: '24px', color: '#0f3460' }}></i>
          <span style={{ fontWeight: '800', fontSize: '1.5rem', color: '#0f3460', letterSpacing: '-1px' }}>SmartHostel</span>
        </div>
        {!token && (
          <div>
            <Link to="/login" style={{ textDecoration: 'none', color: '#0f3460', fontWeight: '600', marginRight: '20px' }}>Login</Link>
            <Link to="/register" style={{ ...buttonPrimary, padding: '10px 20px' }}>Join Now</Link>
          </div>
        )}
      </nav>

      <section style={heroStyle}>
        <h1 style={{ fontSize: '4rem', marginBottom: '20px', fontWeight: '900', letterSpacing: '-2px' }}>
          Hostel Living, <span style={{ color: '#e94560' }}>Simplified.</span>
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '700px', opacity: '0.8', fontWeight: '300' }}>
          The all-in-one digital solution for students and administrators to manage maintenance, 
          communication, and hostel operations seamlessly.
        </p>
        <div>
          {token ? (
            <Link to={dashboardPath} style={buttonPrimary}>Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/register" style={buttonPrimary}>Get Started</Link>
              <Link to="/login" style={buttonSecondary}>Learn More</Link>
            </>
          )}
        </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a2e' }}>Why Choose SmartHostel?</h2>
          <div style={{ width: '60px', height: '4px', background: '#e94560', margin: '20px auto' }}></div>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          <FeatureCard 
            icon="fa-bolt" 
            title="Instant Reporting" 
            desc="Students can report issues in seconds. No more physical registers or waiting in lines."
          />
          <FeatureCard 
            icon="fa-tasks" 
            title="Efficient Tracking" 
            desc="Real-time status updates from 'Pending' to 'Resolved'. Complete transparency for everyone."
          />
          <FeatureCard 
            icon="fa-shield-alt" 
            title="Admin Oversight" 
            desc="Powerful dashboard for administrators to monitor staff performance and hostel health."
          />
        </div>
      </section>

      <footer style={{ marginTop: '80px', textAlign: 'center', color: '#718096', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} Smart Hostel Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;