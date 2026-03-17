import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('sf_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.userType && parsedUser.id) {
          setUser(parsedUser);
          if (!localStorage.getItem('sf_currentPage') && parsedUser.userType) {
            localStorage.setItem('sf_currentPage', parsedUser.userType);
          }
        } else {
          localStorage.removeItem('sf_user');
          localStorage.removeItem('sf_currentPage');
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('sf_user');
        localStorage.removeItem('sf_currentPage');
      }
    }
  }, []);

  // Login function - connects to backend
  const login = async (userType, userData = {}) => {
    try {
      setLoading(true);
      const response = await API.post('/register/login', {
        email: userData.email,
        password: userData.password
      });

      const { accessToken } = response.data.data;

      const newUser = {
        id: response.data.data._id || Date.now().toString(),
        email: userData.email,
        name: userData.name || userData.email,
        userType,
        token: accessToken,
        createdAt: new Date().toISOString(),
        ...userData
      };

      localStorage.setItem('sf_user', JSON.stringify(newUser));
      localStorage.setItem('sf_currentPage', userType);
      setUser(newUser);
      return { success: true, data: newUser };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Signup function - connects to backend
  const signup = async (userType, userData) => {
    try {
      setLoading(true);

      let endpoint = '/register/register-user';
      if (userType === 'driver') endpoint = '/register/register-driver';
      if (userType === 'dispatcher') endpoint = '/register/register-dispatcher';
      if (userType === 'admin') endpoint = '/register/register-admin';

      const response = await API.post(endpoint, userData);
      const { accessToken } = response.data.data;

      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || userData.name,
        userType,
        token: accessToken,
        createdAt: new Date().toISOString(),
        ...userData
      };

      localStorage.setItem('sf_user', JSON.stringify(newUser));
      localStorage.setItem('sf_currentPage', userType);
      setUser(newUser);
      return { success: true, data: newUser };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('sf_user');
    localStorage.removeItem('sf_currentPage');
    setUser(null);
  };

  const isAuthenticated = () => !!user && !!localStorage.getItem('sf_user');
  const getUserType = () => user?.userType;

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('sf_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return updatedUser;
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated,
    getUserType,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};