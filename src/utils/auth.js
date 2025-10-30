// Authentication utility functions

/**
 * Check if user is logged in
 * @returns {boolean} - true if user is logged in, false otherwise
 */
export const isLoggedIn = () => {
  const loginStatus = localStorage.getItem('isLoggedIn');
  return loginStatus === 'true';
};

/**
 * Get current user information
 * @returns {Object|null} - User object if logged in, null otherwise
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Login user with credentials
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {boolean} - true if login successful, false otherwise
 */
export const login = (username, password) => {
  // Static credentials as requested
  if (username === 'olankaadmin' && password === 'olankaadmin') {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({ username: 'olankaadmin' }));
    return true;
  }
  return false;
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
};

/**
 * Hook to check authentication status in React components
 * @returns {Object} - Authentication state and user info
 */
export const useAuth = () => {
  const authenticated = isLoggedIn();
  const user = getCurrentUser();

  return {
    isAuthenticated: authenticated,
    user: user,
    logout: logout
  };
};