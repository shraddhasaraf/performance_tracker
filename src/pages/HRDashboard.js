import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import AISummaryPanel from '../components/AISummaryPanel';
import CollapsibleFeedbackHistory from '../components/CollapsibleFeedbackHistory';
import Tooltip from '../components/Tooltip';
import { teams, getAllEmployees } from '../data/mockData';
import './HRDashboard.css';

const HRDashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTeams, setExpandedTeams] = useState({ 
    Research: true, 
    Design: false, 
    Engineering: false, 
    Analytics: false 
  });

  const allEmployees = getAllEmployees();

  // Filter employees based on search term
  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return allEmployees;
    
    return allEmployees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allEmployees, searchTerm]);

  const toggleTeam = (teamName) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamName]: !prev[teamName]
    }));
  };

  const selectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Removed unused variables since we're using new components

  const sidebar = (
    <div className="hr-sidebar">
      {/* Search Bar */}
      <div className="search-section">
        <h3 className="sidebar-title">Search Employees</h3>
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input search-input"
          />
          {searchTerm && (
            <button 
              onClick={clearSearch}
              className="clear-search-btn"
              type="button"
            >
              ×
            </button>
          )}
        </div>
        
        {/* Search Results */}
        {searchTerm && (
          <div className="search-results">
            <h4 className="search-results-title">
              Search Results ({filteredEmployees.length})
            </h4>
            <div className="search-results-list">
              {filteredEmployees.map((employee) => (
                <button
                  key={employee.id}
                  onClick={() => selectEmployee(employee)}
                  className={`search-result-item ${
                    selectedEmployee?.id === employee.id ? 'selected' : ''
                  }`}
                >
                  <div className="employee-info">
                    <div className="avatar">{employee.avatar}</div>
                    <div className="employee-details">
                      <span className="employee-name">{employee.name}</span>
                      <span className="employee-team">{employee.team || 'Research'}</span>
                    </div>
                  </div>
                </button>
              ))}
              {filteredEmployees.length === 0 && (
                <div className="no-results">
                  No employees found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Team Filter */}
      <div className="team-filter-section">
        <h3 className="sidebar-title">Team Filter</h3>
        <div className="team-filter">
          {Object.entries(teams).map(([teamName, team]) => (
            <div key={teamName} className="team-section">
              <button
                onClick={() => toggleTeam(teamName)}
                className="team-toggle"
              >
                <span className={`team-arrow ${expandedTeams[teamName] ? 'expanded' : ''}`}>
                  ▶
                </span>
                {teamName}
                <span className="team-count">({team.employees.length})</span>
              </button>
              
              {expandedTeams[teamName] && (
                <div className="employee-list">
                  {team.employees.map((employee) => (
                    <button
                      key={employee.id}
                      onClick={() => selectEmployee(employee)}
                      className={`employee-item ${
                        selectedEmployee?.id === employee.id ? 'selected' : ''
                      }`}
                    >
                      <div className="employee-info">
                        <div className="avatar">{employee.avatar}</div>
                        <div className="employee-details">
                          <span className="employee-name">{employee.name}</span>
                          <span className="employee-progress">{employee.progress}% complete</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout showSidebar={true} sidebar={sidebar}>
      <div className="hr-dashboard">
        {!selectedEmployee ? (
          <div className="hr-home">
            <div className="hr-home-content">
              <h1 className="hr-title">Checkin and Feedback Analysis</h1>
              <p className="hr-subtitle">September 2024 Performance Overview</p>
              
              <div className="analytics-grid">
                <div className="analytics-card">
                  <div className="card-header">
                    <h3>
                      Team Performance
                      <Tooltip 
                        content="Shows the average goal completion percentage for each team based on individual member progress"
                        position="auto"
                      >
                        <span className="info-icon">i</span>
                      </Tooltip>
                    </h3>
                  </div>
                  <div className="team-performance-grid">
                    {Object.entries(teams).map(([teamName, team]) => (
                      <div key={teamName} className="team-performance-item">
                        <span className="team-name">{teamName}</span>
                        <div className="team-stats">
                          <span className="team-count">{team.employees.length} members</span>
                          <span className="team-avg">
                            {Math.round(team.employees.reduce((sum, emp) => sum + emp.progress, 0) / team.employees.length)}% avg
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="analytics-card">
                  <div className="card-header">
                    <h3>
                      Checkin Status
                      <Tooltip 
                        content="Tracks how many employees have completed their monthly check-ins versus those still pending submission"
                        position="auto"
                      >
                        <span className="info-icon">i</span>
                      </Tooltip>
                    </h3>
                  </div>
                  <div className="checkin-stats">
                    <div className="stat-item">
                      <span className="stat-number">{allEmployees.length}</span>
                      <span className="stat-label">Total Employees</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">3</span>
                      <span className="stat-label">Completed Checkins</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{allEmployees.length - 3}</span>
                      <span className="stat-label">Pending Checkins</span>
                    </div>
                  </div>
                </div>

                <div className="analytics-card">
                  <div className="card-header">
                    <h3>
                      Performance Metrics
                      <Tooltip 
                        content="Key performance indicators showing overall employee progress, goal alignment, and feedback engagement rates"
                        position="auto"
                      >
                        <span className="info-icon">i</span>
                      </Tooltip>
                    </h3>
                  </div>
                  <div className="performance-metrics">
                    <div className="metric-item">
                      <span className="metric-label">
                        Average Progress
                        <Tooltip 
                          content="The average percentage of goal completion across all employees in the organization"
                          position="auto"
                        >
                          <span className="info-icon">i</span>
                        </Tooltip>
                      </span>
                      <span className="metric-value">
                        {Math.round(allEmployees.reduce((sum, emp) => sum + emp.progress, 0) / allEmployees.length)}%
                      </span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">
                        On Track Goals
                        <Tooltip 
                          content="Percentage of employee goals that are currently marked as 'on track' based on latest check-ins"
                          position="auto"
                        >
                          <span className="info-icon">i</span>
                        </Tooltip>
                      </span>
                      <span className="metric-value">85%</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">
                        Manager Feedback Rate
                        <Tooltip 
                          content="Percentage of employees who have received feedback from their managers this month"
                          position="auto"
                        >
                          <span className="info-icon">i</span>
                        </Tooltip>
                      </span>
                      <span className="metric-value">92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="employee-header">
              <div className="employee-title-section">
                <div className="avatar avatar-lg">{selectedEmployee.avatar}</div>
                <div className="employee-info">
                  <h1 className="employee-name">{selectedEmployee.name}</h1>
                  <p className="employee-email">{selectedEmployee.email}</p>
                  <p className="employee-team-info">
                    {selectedEmployee.team || 'Research'} Team • Managed by {selectedEmployee.manager}
                  </p>
                </div>
              </div>
              
              <div className="progress-section">
                <div className="progress-info">
                  <span className="progress-label">Overall Goal Progress</span>
                  <span className="progress-percentage">{selectedEmployee.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${selectedEmployee.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="dashboard-content">
              {/* AI Summary Panel */}
              <AISummaryPanel 
                employeeId={selectedEmployee.id}
                employeeName={selectedEmployee.name}
              />

              {/* Collapsible Feedback History */}
              <CollapsibleFeedbackHistory 
                employeeId={selectedEmployee.id}
                employeeName={selectedEmployee.name}
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default HRDashboard;
