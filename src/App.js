import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FeedbackProvider } from './context/FeedbackContext';
import LoginPage from './pages/LoginPage';
import HRDashboard from './pages/HRDashboard';
import ManagerLanding from './pages/ManagerLanding';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to={`/${user.role}`} replace /> : <LoginPage />} 
      />
      
      <Route 
        path="/hr" 
        element={
          <ProtectedRoute allowedRoles={['hr']}>
            <HRDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/manager" 
        element={
          <ProtectedRoute allowedRoles={['manager']}>
            <ManagerLanding />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/manager/team" 
        element={
          <ProtectedRoute allowedRoles={['manager']}>
            <ManagerDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/manager/self" 
        element={
          <ProtectedRoute allowedRoles={['manager']}>
            <EmployeeDashboard isManager={true} />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/employee" 
        element={
          <ProtectedRoute allowedRoles={['employee']}>
            <EmployeeDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/unauthorized" 
        element={
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            flexDirection: 'column' 
          }}>
            <h1>Unauthorized Access</h1>
            <p>You don't have permission to access this page.</p>
          </div>
        } 
      />
      
      <Route 
        path="/" 
        element={
          user ? <Navigate to={`/${user.role}`} replace /> : <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <FeedbackProvider>
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </FeedbackProvider>
    </AuthProvider>
  );
}

export default App;
