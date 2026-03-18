import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import API from '../api/axios';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await API.get('/user/profile');
      setProfile(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      const response = await API.put('/user/profile', updates);
      setProfile(response.data.data);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Update failed' };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const value = {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

