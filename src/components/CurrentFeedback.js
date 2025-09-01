import React from 'react';
import { useFeedback } from '../context/FeedbackContext';
import './CurrentFeedback.css';

const CurrentFeedback = ({ employeeId, employeeName = null, showTitle = true }) => {
  const { getCurrentFeedback, hasCurrentFeedback } = useFeedback();
  
  if (!hasCurrentFeedback(employeeId)) {
    return null;
  }

  const currentFeedback = getCurrentFeedback(employeeId);
  const currentMonth = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="current-feedback-section card">
      {showTitle && (
        <h2 className="section-title">
          Current Check-in - {currentMonth}
          {employeeName && <span className="employee-name-badge">{employeeName}</span>}
        </h2>
      )}
      
      <div className="current-feedback-grid">
        {/* Employee Feedback */}
        {currentFeedback.employee && (
          <div className="current-feedback-card employee-feedback">
            <div className="feedback-header">
              <h3 className="feedback-title">Employee Feedback</h3>
              <div className="feedback-status">
                <span className="status-badge submitted">Submitted</span>
                <span className="submission-time">
                  {new Date(currentFeedback.employee.submittedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="feedback-content">
              <p className="feedback-summary">{currentFeedback.employee.content}</p>
              
              {/* Goal Status Summary */}
              {currentFeedback.employee.goals && Object.keys(currentFeedback.employee.goals).length > 0 && (
                <div className="goals-summary">
                  <h4>Goal Updates:</h4>
                  {Object.entries(currentFeedback.employee.goals).map(([goalId, goalData]) => (
                    <div key={goalId} className="goal-status-item">
                      {goalData.status && (
                        <span className={`status-badge ${goalData.status}`}>
                          {goalData.status.replace('-', ' ')}
                        </span>
                      )}
                      {goalData.feedback && (
                        <span className="goal-feedback-text">{goalData.feedback}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Health Check Summary */}
              {currentFeedback.employee.healthCheck && (
                <div className="health-check-summary">
                  <h4>Health Check:</h4>
                  <div className="health-metrics">
                    {currentFeedback.employee.healthCheck.enjoyWork && (
                      <div className="health-metric">
                        <span className="metric-label">Work Enjoyment:</span>
                        <span className="metric-value">
                          {currentFeedback.employee.healthCheck.enjoyWork}/5
                        </span>
                      </div>
                    )}
                    {currentFeedback.employee.healthCheck.managerSupport !== undefined && (
                      <div className="health-metric">
                        <span className="metric-label">Manager Support:</span>
                        <span className="metric-value">
                          {currentFeedback.employee.healthCheck.managerSupport ? 'Yes' : 'No'}
                        </span>
                      </div>
                    )}
                    {currentFeedback.employee.healthCheck.blockers && (
                      <div className="health-metric">
                        <span className="metric-label">Blockers:</span>
                        <span className="metric-value blockers">
                          {currentFeedback.employee.healthCheck.blockers}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Manager Feedback */}
        {currentFeedback.manager && (
          <div className="current-feedback-card manager-feedback">
            <div className="feedback-header">
              <h3 className="feedback-title">Manager Feedback</h3>
              <div className="feedback-status">
                <span className="status-badge submitted">Submitted</span>
                <span className="submission-time">
                  {new Date(currentFeedback.manager.submittedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="feedback-content">
              <p className="feedback-summary">{currentFeedback.manager.content}</p>
              
              {/* Goal Status Summary */}
              {currentFeedback.manager.goals && Object.keys(currentFeedback.manager.goals).length > 0 && (
                <div className="goals-summary">
                  <h4>Goal Assessments:</h4>
                  {Object.entries(currentFeedback.manager.goals).map(([goalId, goalData]) => (
                    <div key={goalId} className="goal-status-item">
                      {goalData.status && (
                        <span className={`status-badge ${goalData.status}`}>
                          {goalData.status.replace('-', ' ')}
                        </span>
                      )}
                      {goalData.feedback && (
                        <span className="goal-feedback-text">{goalData.feedback}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pending Feedback Notice */}
        {!currentFeedback.employee && !currentFeedback.manager && (
          <div className="no-current-feedback">
            <p>No current check-in feedback submitted yet for {currentMonth}.</p>
          </div>
        )}
        
        {/* Awaiting Response */}
        {(currentFeedback.employee && !currentFeedback.manager) && (
          <div className="awaiting-feedback">
            <div className="awaiting-card">
              <h3>Awaiting Manager Response</h3>
              <p>Employee has submitted their check-in. Manager feedback is pending.</p>
            </div>
          </div>
        )}
        
        {(currentFeedback.manager && !currentFeedback.employee) && (
          <div className="awaiting-feedback">
            <div className="awaiting-card">
              <h3>Awaiting Employee Check-in</h3>
              <p>Manager feedback is ready. Employee check-in is pending.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentFeedback;

