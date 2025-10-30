import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth';

const ProtectedRoute = ({ children }) => {
  // Check if user is logged in
  const authenticated = isLoggedIn();

  // If not authenticated, redirect to login page
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;