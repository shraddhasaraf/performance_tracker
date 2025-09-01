import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();

  if (user) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(email, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const fillDemoCredentials = (role) => {
    switch (role) {
      case 'hr':
        setEmail('hr@company.com');
        setPassword('password');
        break;
      case 'manager':
        setEmail('manager@company.com');
        setPassword('password');
        break;
      case 'employee':
        setEmail('employee@company.com');
        setPassword('password');
        break;
      default:
        break;
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card card">
          <div className="login-header">
            <h1 className="login-title">
              AI Performance Check-in Assistant
            </h1>
            <p className="login-subtitle">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary login-btn"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="demo-section">
            <p className="demo-title">Demo Accounts:</p>
            <div className="demo-buttons">
              <button
                type="button"
                onClick={() => fillDemoCredentials('hr')}
                className="btn btn-secondary demo-btn"
              >
                HR Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('manager')}
                className="btn btn-secondary demo-btn"
              >
                Manager Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('employee')}
                className="btn btn-secondary demo-btn"
              >
                Employee Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

