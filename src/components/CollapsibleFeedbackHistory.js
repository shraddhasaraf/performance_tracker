import React, { useState } from 'react';
import { useFeedback } from '../context/FeedbackContext';
import { getFeedbackForEmployee, getGoalsForEmployee } from '../data/mockData';
import './CollapsibleFeedbackHistory.css';

const CollapsibleFeedbackHistory = ({ employeeId, employeeName = null, showTitle = true }) => {
  const { getCurrentFeedback } = useFeedback();
  const [expandedMonths, setExpandedMonths] = useState({ 'September 2024': true });
  
  const toggleMonth = (month) => {
    setExpandedMonths(prev => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

  // Get historical feedback
  const historicalFeedback = getFeedbackForEmployee(employeeId);
  const goals = getGoalsForEmployee(employeeId);
  
  // Get current feedback for September 2024
  const currentFeedback = getCurrentFeedback(employeeId);
  const currentMonth = 'September 2024';

  // Combine current and historical feedback
  const allFeedback = [];
  
  // Add current feedback if it exists
  if (currentFeedback) {
    allFeedback.push({
      id: 'current',
      month: currentMonth,
      managerFeedback: currentFeedback.manager,
      employeeFeedback: currentFeedback.employee,
      isCurrent: true
    });
  }
  
  // Add historical feedback
  allFeedback.push(...historicalFeedback);

  const renderManagerFeedback = (feedback) => {
    if (!feedback) return null;
    
    return (
      <div className="feedback-section manager-section">
        <h4 className="feedback-section-title">Manager Feedback</h4>
        <div className="feedback-content">
          {feedback.expectation && (
            <div className="expectation-rating">
              <span className="rating-label">Meeting Expectations:</span>
              <span className="rating-value">{feedback.expectation}/5</span>
            </div>
          )}
          <div className="feedback-text">
            <p>{feedback.content}</p>
          </div>
        </div>
      </div>
    );
  };



  if (allFeedback.length === 0) {
    return (
      <div className="feedback-history-section card">
        {showTitle && (
          <h2 className="section-title">
            Feedback History
            {employeeName && <span className="employee-name-badge">{employeeName}</span>}
          </h2>
        )}
        <div className="no-feedback">
          <p>No feedback history available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-history-section card">
      {showTitle && (
        <h2 className="section-title">
          Feedback History
          {employeeName && <span className="employee-name-badge">{employeeName}</span>}
        </h2>
      )}
      
      <div className="feedback-timeline">
        {allFeedback.map((feedback) => (
          <div key={feedback.id} className="feedback-month-panel">
            <button
              onClick={() => toggleMonth(feedback.month)}
              className={`month-toggle ${feedback.isCurrent ? 'current-month' : ''}`}
            >
              <span className={`toggle-arrow ${expandedMonths[feedback.month] ? 'expanded' : ''}`}>
                ▶
              </span>
              <span className="month-title">{feedback.month}</span>
              {feedback.isCurrent && <span className="current-badge">Current</span>}
            </button>
            
            {expandedMonths[feedback.month] && (
              <div className="month-content">
                {/* 1. Manager Feedback */}
                {renderManagerFeedback(feedback.managerFeedback)}
                
                {/* 2. Employee Response (combined) */}
                {(feedback.employeeFeedback) && (
                  <div className="feedback-section employee-combined-section">
                    <h4 className="feedback-section-title">Employee Response</h4>
                    <div className="employee-combined-content">
                      {/* Goal Status */}
                      {feedback.employeeFeedback.goals && (
                        <div className="subsection">
                          <h5 className="subsection-title">Goal Status</h5>
                          <div className="goals-list">
                            {Object.entries(feedback.employeeFeedback.goals).map(([goalId, goalData]) => {
                              const goal = goals.find(g => g.id === goalId);
                              if (!goal || !goalData.status) return null;
                              
                              return (
                                <div key={goalId} className="goal-status-item">
                                  <span className="goal-title">{goal.title}</span>
                                  <span className={`status-badge ${goalData.status}`}>
                                    {goalData.status.replace('-', ' ')}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {/* Employee Feedback */}
                      {feedback.employeeFeedback.content && (
                        <div className="subsection">
                          <h5 className="subsection-title">Feedback</h5>
                          <div className="feedback-text">
                            <p>{feedback.employeeFeedback.content}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Health Check */}
                      {feedback.employeeFeedback.healthCheck && (
                        <div className="subsection">
                          <h5 className="subsection-title">Health Check</h5>
                          <div className="health-metrics-text">
                            {feedback.employeeFeedback.healthCheck.enjoyWork && (
                              <p><strong>Work Enjoyment:</strong> {feedback.employeeFeedback.healthCheck.enjoyWork}/5</p>
                            )}
                            {feedback.employeeFeedback.healthCheck.managerSupport !== undefined && (
                              <p><strong>Manager Support:</strong> {feedback.employeeFeedback.healthCheck.managerSupport ? 'Yes' : 'No'}</p>
                            )}
                            {feedback.employeeFeedback.healthCheck.blockers && (
                              <p><strong>Blockers:</strong> {feedback.employeeFeedback.healthCheck.blockers}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollapsibleFeedbackHistory;
