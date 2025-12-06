'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserSession(data.user);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (token, user) => {
    localStorage.setItem('token', token);
    setUserSession(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUserSession(null);
    setIsLoggedIn(false);
  };

  const updateUserSession = (updatedUser) => {
    setUserSession(updatedUser);
  };

  const value = {
    userSession,
    setUserSession,
    isLoggedIn,
    setIsLoggedIn,
    loading,
    login,
    logout,
    updateUserSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};