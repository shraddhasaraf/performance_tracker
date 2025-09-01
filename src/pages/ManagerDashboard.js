import React, { useState } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import AISummaryPanel from '../components/AISummaryPanel';
import CollapsibleFeedbackHistory from '../components/CollapsibleFeedbackHistory';
import { useFeedback } from '../context/FeedbackContext';
import { teams } from '../data/mockData';
import { reframeFeedbackWithAI } from '../utils/aiApi';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const { saveCurrentFeedback } = useFeedback();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [expandedTeams, setExpandedTeams] = useState({ Research: true });
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiModalContent, setAIModalContent] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});
  const [aiLoading, setAiLoading] = useState(false);

  const toggleTeam = (teamName) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamName]: !prev[teamName]
    }));
  };

  const selectEmployee = (employee) => {
    setSelectedEmployee(employee);
    // Initialize feedback data for this employee if not exists
    if (!feedbackData[employee.id]) {
      setFeedbackData(prev => ({
        ...prev,
        [employee.id]: {
          expectation: 3,
          checkinUpdates: ''
        }
      }));
    }
  };

  const handleExpectationChange = (value) => {
    if (!selectedEmployee) return;
    
    setFeedbackData(prev => ({
      ...prev,
      [selectedEmployee.id]: {
        ...prev[selectedEmployee.id],
        expectation: value
      }
    }));
  };

  const handleCheckinUpdatesChange = (value) => {
    if (!selectedEmployee) return;
    
    setFeedbackData(prev => ({
      ...prev,
      [selectedEmployee.id]: {
        ...prev[selectedEmployee.id],
        checkinUpdates: value
      }
    }));
  };

  const handleReframeWithAI = async () => {
    if (!selectedEmployee) return;
    
    const currentFeedback = feedbackData[selectedEmployee.id]?.checkinUpdates || '';
    
    if (!currentFeedback.trim()) {
      setAIModalContent('Please enter some checkin updates first before using AI reframing.');
      setShowAIModal(true);
      return;
    }

    setAiLoading(true);
    setShowAIModal(true);
    setAIModalContent('🤖 AI is reframing your feedback...');

    try {
      const result = await reframeFeedbackWithAI(currentFeedback);
      
      if (result.success) {
        setAIModalContent(
          `AI Reframed Checkin Updates:\n\n` +
          `Original: "${result.originalText}"\n\n` +
          `Reframed: "${result.reframedText}"\n\n` +
          `Would you like to use this reframed version?`
        );
      } else {
        setAIModalContent(
          `Sorry, there was an error reframing your feedback:\n\n` +
          `${result.error}\n\n` +
          `Please try again later.`
        );
      }
    } catch (error) {
      setAIModalContent(
        `Sorry, there was an unexpected error:\n\n` +
        `${error.message}\n\n` +
        `Please try again later.`
      );
    } finally {
      setAiLoading(false);
    }
  };

  const handleUseReframedText = () => {
    if (selectedEmployee && !aiLoading) {
      const aiResponse = aiModalContent.split('Reframed: "')[1]?.split('"\n\n')[0];
      if (aiResponse) {
        handleCheckinUpdatesChange(aiResponse);
      }
    }
    setShowAIModal(false);
  };

  const handleSubmitFeedback = () => {
    if (!selectedEmployee) return;
    
    // Save current feedback using the feedback context
    const employeeId = selectedEmployee.id;
    const currentData = feedbackData[employeeId] || {};
    const managerFeedbackData = {
      expectation: currentData.expectation || 3,
      content: currentData.checkinUpdates || '',
      employeeName: selectedEmployee.name
    };
    
    saveCurrentFeedback(employeeId, managerFeedbackData, 'manager');
    setShowSubmitModal(true);
  };

  // Remove the old goals and feedback references since we're using new components

  const sidebar = (
    <div className="manager-sidebar">
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
  );

  return (
    <Layout showSidebar={true} sidebar={sidebar}>
      <div className="manager-dashboard">
        {!selectedEmployee ? (
          <div className="no-selection">
            <div className="no-selection-content">
              <h2>Select an Employee</h2>
              <p>Choose a team member from the sidebar to view their progress and provide feedback.</p>
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
              {/* Simplified Manager Feedback Form */}
              <div className="manager-feedback-section card">
                <h2 className="section-title">September 2024 Check-in Feedback</h2>
                
                <div className="feedback-form">
                  <div className="form-group">
                    <label className="form-label">
                      Is {selectedEmployee.name} meeting expectations? (1-5 scale)
                    </label>
                    <div className="likert-scale">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="likert-option">
                          <input
                            type="radio"
                            name="expectation"
                            value={value}
                            checked={feedbackData[selectedEmployee.id]?.expectation === value}
                            onChange={(e) => handleExpectationChange(parseInt(e.target.value))}
                          />
                          <span className="likert-label">{value}</span>
                        </label>
                      ))}
                    </div>
                    <div className="likert-labels">
                      <span>Below Expectations</span>
                      <span>Exceeds Expectations</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Checkin Updates</label>
                    <div className="feedback-input-group">
                      <textarea
                        className="input textarea"
                        placeholder="Provide detailed checkin updates for this team member..."
                        value={feedbackData[selectedEmployee.id]?.checkinUpdates || ''}
                        onChange={(e) => handleCheckinUpdatesChange(e.target.value)}
                        rows={6}
                      />
                      <button 
                        type="button"
                        className="btn btn-secondary ai-btn"
                        onClick={handleReframeWithAI}
                        disabled={aiLoading}
                      >
                        {aiLoading ? 'Reframing...' : 'Reframe with AI'}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="submit-section">
                  <button 
                    onClick={handleSubmitFeedback}
                    className="btn btn-success submit-btn"
                  >
                    Submit Feedback
                  </button>
                </div>
              </div>

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

      <Modal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        title="AI Feedback Suggestion"
      >
        <div style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
          {aiModalContent}
        </div>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {!aiLoading && aiModalContent.includes('Reframed:') ? (
            <>
              <button 
                onClick={handleUseReframedText}
                className="btn btn-success"
              >
                Use This Version
              </button>
              <button 
                onClick={() => setShowAIModal(false)}
                className="btn btn-secondary"
              >
                Keep Original
              </button>
            </>
          ) : (
            <button 
              onClick={() => setShowAIModal(false)}
              className="btn btn-primary"
              disabled={aiLoading}
            >
              {aiLoading ? 'Please wait...' : 'Close'}
            </button>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Feedback Submitted!"
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '3rem', 
            color: 'var(--primary-green)', 
            marginBottom: '1rem' 
          }}>
            ✓
          </div>
          <p style={{ marginBottom: '1.5rem' }}>
            Your feedback for {selectedEmployee?.name} has been successfully submitted.
            The employee will be notified and can view your feedback in their dashboard.
          </p>
          <button 
            onClick={() => setShowSubmitModal(false)}
            className="btn btn-primary"
          >
            Close
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default ManagerDashboard;
