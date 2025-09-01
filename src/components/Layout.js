import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children, showSidebar = false, sidebar = null }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleTitleClick = () => {
    if (user?.role === 'hr' || user?.role === 'manager') {
      navigate(`/${user.role}`);
    }
  };

  return (
    <div className="layout">
      {/* Top Navigation */}
      <header className="layout-header">
        <div className="header-content">
          <div className="header-left">
            <h1 
              className={`app-title ${(user?.role === 'hr' || user?.role === 'manager') ? 'clickable' : ''}`}
              onClick={handleTitleClick}
            >
              AI Performance Check-in Assistant
            </h1>
          </div>
          <div className="header-right">
            <span className="user-info">
              Welcome, {user?.name}
            </span>
            <button 
              onClick={logout}
              className="btn btn-secondary logout-btn"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="layout-body">
        {showSidebar && sidebar && (
          <aside className="layout-sidebar">
            {sidebar}
          </aside>
        )}
        <main className={`layout-main ${showSidebar ? 'with-sidebar' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

