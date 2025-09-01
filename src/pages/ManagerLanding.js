import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import './ManagerLanding.css';

const ManagerLanding = () => {
  const navigate = useNavigate();

  const handleLogMyProgress = () => {
    navigate('/manager/self');
  };

  const handleLogTeamProgress = () => {
    navigate('/manager/team');
  };

  return (
    <Layout>
      <div className="manager-landing">
        <div className="manager-landing-container">
          <div className="manager-landing-card card">
            <div className="manager-landing-header">
              <h1 className="manager-landing-title">
                Welcome to your Manager Dashboard
              </h1>
              <p className="manager-landing-subtitle">
                Choose what you'd like to do today
              </p>
            </div>

            <div className="manager-options">
              <div className="manager-option-card card" onClick={handleLogMyProgress}>
                <div className="option-icon">
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className="option-title">Log My Own Progress</h3>
                <p className="option-description">
                  Complete your personal monthly check-in and track your own goals
                </p>
                <button className="btn btn-primary option-button">
                  Get Started
                </button>
              </div>

              <div className="manager-option-card card" onClick={handleLogTeamProgress}>
                <div className="option-icon team-icon">
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="option-title">Log My Team's Progress</h3>
                <p className="option-description">
                  Review and provide feedback for your team members' performance
                </p>
                <button className="btn btn-success option-button">
                  Manage Team
                </button>
              </div>
            </div>

            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-number">4</span>
                <span className="stat-label">Team Members</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2</span>
                <span className="stat-label">Pending Reviews</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">85%</span>
                <span className="stat-label">Team Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManagerLanding;

