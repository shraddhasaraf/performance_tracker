import React, { createContext, useContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};

export const FeedbackProvider = ({ children }) => {
  const [currentFeedback, setCurrentFeedback] = useState({});

  useEffect(() => {
    // Load any stored current feedback from localStorage
    const storedFeedback = localStorage.getItem('currentFeedback');
    if (storedFeedback) {
      setCurrentFeedback(JSON.parse(storedFeedback));
    }
  }, []);

  const saveCurrentFeedback = (employeeId, feedbackData, feedbackType = 'employee') => {
    const currentMonth = 'September 2024'; // Fixed to September for demo

    const newFeedback = {
      ...currentFeedback,
      [employeeId]: {
        ...currentFeedback[employeeId],
        month: currentMonth,
        [feedbackType]: {
          ...feedbackData,
          submittedAt: new Date().toISOString(),
          status: 'submitted'
        }
      }
    };

    setCurrentFeedback(newFeedback);
    localStorage.setItem('currentFeedback', JSON.stringify(newFeedback));
  };

  const getCurrentFeedback = (employeeId) => {
    return currentFeedback[employeeId] || null;
  };

  const hasCurrentFeedback = (employeeId, feedbackType = null) => {
    const feedback = currentFeedback[employeeId];
    if (!feedback) return false;
    
    if (feedbackType) {
      return feedback[feedbackType]?.status === 'submitted';
    }
    
    return feedback.employee?.status === 'submitted' || feedback.manager?.status === 'submitted';
  };

  const clearCurrentFeedback = (employeeId) => {
    const newFeedback = { ...currentFeedback };
    delete newFeedback[employeeId];
    setCurrentFeedback(newFeedback);
    localStorage.setItem('currentFeedback', JSON.stringify(newFeedback));
  };

  const getAllCurrentFeedback = () => {
    return currentFeedback;
  };

  const value = {
    currentFeedback,
    saveCurrentFeedback,
    getCurrentFeedback,
    hasCurrentFeedback,
    clearCurrentFeedback,
    getAllCurrentFeedback
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

