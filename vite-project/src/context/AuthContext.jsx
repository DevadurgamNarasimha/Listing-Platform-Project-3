import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Mock login function - in a real app, this would call your API
  const login = (email, password) => {
    // Simulate authentication and get user data
    const userData = { id: "user123", email, name: email.split('@')[0] };
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  // Mock signup function - in a real app, this would call your API
  const signup = (name, email, password) => {
    // Simulate user creation
    const userData = { id: "user123", email, name };
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 