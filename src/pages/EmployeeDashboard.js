import React, { useState } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import AISummaryPanel from '../components/AISummaryPanel';
import CollapsibleFeedbackHistory from '../components/CollapsibleFeedbackHistory';
import { useFeedback } from '../context/FeedbackContext';
import { getGoalsForEmployee } from '../data/mockData';
import { reframeFeedbackWithAI } from '../utils/aiApi';
import './EmployeeDashboard.css';

const EmployeeDashboard = ({ isManager = false }) => {
  const { saveCurrentFeedback } = useFeedback();
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiModalContent, setAIModalContent] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [currentGoalId, setCurrentGoalId] = useState(null);
  const [formData, setFormData] = useState({
    goals: {},
    healthCheck: {
      enjoyWork: 3,
      managerSupport: true,
      blockers: ''
    }
  });

  const goals = getGoalsForEmployee('emp1'); // Using sample data
  // Removed feedback variable since we're using new components

  const calculateOverallProgress = () => {
    if (goals.length === 0) return 0;
    return Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length);
  };

  const handleGoalStatusChange = (goalId, status) => {
    setFormData(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        [goalId]: {
          ...prev.goals[goalId],
          status
        }
      }
    }));
  };

  const handleGoalFeedbackChange = (goalId, feedback) => {
    setFormData(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        [goalId]: {
          ...prev.goals[goalId],
          feedback
        }
      }
    }));
  };

  const handleHealthCheckChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      healthCheck: {
        ...prev.healthCheck,
        [field]: value
      }
    }));
  };

  const handleReframeWithAI = async (goalId, goalTitle) => {
    const currentFeedback = formData.goals[goalId]?.feedback || '';
    
    if (!currentFeedback.trim()) {
      setAIModalContent('Please enter some feedback text first before using AI reframing.');
      setShowAIModal(true);
      return;
    }

    setCurrentGoalId(goalId);
    setAiLoading(true);
    setShowAIModal(true);
    setAIModalContent('🤖 AI is reframing your feedback...');

    try {
      const result = await reframeFeedbackWithAI(currentFeedback);
      
      if (result.success) {
        setAIModalContent(
          `AI Reframed Feedback for "${goalTitle}":\n\n` +
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
    if (currentGoalId && !aiLoading) {
      const aiResponse = aiModalContent.split('Reframed: "')[1]?.split('"\n\n')[0];
      if (aiResponse) {
        handleGoalFeedbackChange(currentGoalId, aiResponse);
      }
    }
    setShowAIModal(false);
    setCurrentGoalId(null);
  };

  const handleSubmit = () => {
    // Save current feedback using the feedback context
    const employeeId = 'emp1'; // In a real app, this would come from the user context
    const feedbackData = {
      goals: formData.goals,
      healthCheck: formData.healthCheck,
      content: generateFeedbackSummary()
    };
    
    saveCurrentFeedback(employeeId, feedbackData, 'employee');
    setShowSubmitModal(true);
  };

  const generateFeedbackSummary = () => {
    const goalFeedbacks = Object.values(formData.goals)
      .filter(goal => goal.feedback)
      .map(goal => goal.feedback);
    
    return goalFeedbacks.length > 0 
      ? goalFeedbacks.join(' ') 
      : 'Employee has submitted their monthly check-in with goal updates.';
  };

  const currentMonth = 'September 2024'; // Fixed to September for demo

  const overallProgress = calculateOverallProgress();

  // Remove sidebar for employee dashboard - no previous feedback needed
  const sidebar = null;

  return (
    <Layout showSidebar={false} sidebar={sidebar}>
      <div className="employee-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            {isManager ? 'Manager Self Check-in' : 'Monthly Check-in'} – {currentMonth}
          </h1>
          <div className="progress-section">
            <div className="progress-info">
              <span className="progress-label">Overall Progress</span>
              <span className="progress-percentage">{overallProgress}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="goals-section card">
            <h2 className="section-title">Goal Progress & Feedback</h2>
            {goals.map((goal) => (
              <div key={goal.id} className="goal-item">
                <div className="goal-header">
                  <h3 className="goal-title">{goal.title}</h3>
                  <div className="goal-progress">
                    <span className="goal-progress-text">{goal.progress}%</span>
                    <div className="goal-progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="goal-form">
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select 
                      className="input select"
                      value={formData.goals[goal.id]?.status || goal.status}
                      onChange={(e) => handleGoalStatusChange(goal.id, e.target.value)}
                    >
                      <option value="on-track">On track</option>
                      <option value="needs-attention">Needs attention</option>
                      <option value="off-track">Off track</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Your feedback</label>
                    <div className="feedback-input-group">
                      <textarea
                        className="input textarea"
                        placeholder="Share your thoughts on this goal..."
                        value={formData.goals[goal.id]?.feedback || ''}
                        onChange={(e) => handleGoalFeedbackChange(goal.id, e.target.value)}
                      />
                      <button 
                        type="button"
                        className="btn btn-secondary ai-btn"
                        onClick={() => handleReframeWithAI(goal.id, goal.title)}
                        disabled={aiLoading}
                      >
                        {aiLoading ? 'Reframing...' : 'Reframe with AI'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="health-check-section card">
            <h2 className="section-title">Health Check</h2>
            
            <div className="health-question">
              <label className="form-label">Do you enjoy the work? (1-5 scale)</label>
              <div className="likert-scale">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="likert-option">
                    <input
                      type="radio"
                      name="enjoyWork"
                      value={value}
                      checked={formData.healthCheck.enjoyWork === value}
                      onChange={(e) => handleHealthCheckChange('enjoyWork', parseInt(e.target.value))}
                    />
                    <span className="likert-label">{value}</span>
                  </label>
                ))}
              </div>
              <div className="likert-labels">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
            </div>

            <div className="health-question">
              <label className="form-label">Do you feel supported by your manager?</label>
              <div className="toggle-group">
                <label className="toggle-option">
                  <input
                    type="radio"
                    name="managerSupport"
                    value="true"
                    checked={formData.healthCheck.managerSupport === true}
                    onChange={() => handleHealthCheckChange('managerSupport', true)}
                  />
                  <span>Yes</span>
                </label>
                <label className="toggle-option">
                  <input
                    type="radio"
                    name="managerSupport"
                    value="false"
                    checked={formData.healthCheck.managerSupport === false}
                    onChange={() => handleHealthCheckChange('managerSupport', false)}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="health-question">
              <label className="form-label">Any blockers or issues?</label>
              <textarea
                className="input textarea"
                placeholder="Share any challenges or blockers you're facing..."
                value={formData.healthCheck.blockers}
                onChange={(e) => handleHealthCheckChange('blockers', e.target.value)}
              />
            </div>
          </div>

          <div className="submit-section">
            <button 
              onClick={handleSubmit}
              className="btn btn-success submit-btn"
            >
              Submit Check-in
            </button>
          </div>

          {/* AI Summary Panel */}
          <AISummaryPanel 
            employeeId="emp1"
            showTitle={true}
          />

          {/* Collapsible Feedback History */}
          <CollapsibleFeedbackHistory 
            employeeId="emp1"
            showTitle={true}
          />
        </div>
      </div>

      <Modal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        title="AI Reframing Suggestion"
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
        title="Check-in Submitted!"
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
            Your monthly check-in has been successfully submitted. 
            Your manager will review it and provide feedback soon.
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

export default EmployeeDashboard;
