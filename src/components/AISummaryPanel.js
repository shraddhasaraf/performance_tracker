import React from 'react';
import { getAISummaryForEmployee, getEmployeeById } from '../data/mockData';
import './AISummaryPanel.css';

const AISummaryPanel = ({ employeeId, employeeName = null, showTitle = true }) => {
  const aiSummary = getAISummaryForEmployee(employeeId);
  const employee = getEmployeeById(employeeId);
  const managerName = employee?.manager || 'Manager';

  if (!aiSummary) {
    return null;
  }

  return (
    <div className="ai-summary-panel card">
      {showTitle && (
        <h2 className="summary-panel-title">
          AI Summarized Feedback
          {employeeName && <span className="employee-name-badge">{employeeName}</span>}
        </h2>
      )}
      
      <div className="summary-grid">
        <div className="summary-card manager-summary">
          <div className="summary-header">
            <h3 className="summary-title">{managerName} Comments</h3>
            <div className="ai-badge">AI Generated</div>
          </div>
          <div className="summary-content">
            <p>{aiSummary.managerSummary}</p>
          </div>
        </div>
        
        <div className="summary-card employee-summary">
          <div className="summary-header">
            <h3 className="summary-title">{employeeName || employee?.name || 'Employee'} Comments</h3>
            <div className="ai-badge">AI Generated</div>
          </div>
          <div className="summary-content">
            <p>{aiSummary.employeeSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISummaryPanel;
