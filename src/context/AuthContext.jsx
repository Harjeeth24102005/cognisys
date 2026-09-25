import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('cognisys_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('cognisys_token');
      if (storedToken) {
        try {
          const profile = await api.getMe();
          setUser(profile);
        } catch (err) {
          console.error('Session expired or invalid:', err);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    localStorage.setItem('cognisys_token', res.access_token);
    setToken(res.access_token);
    setUser(res.user);
    return res.user;
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    localStorage.setItem('cognisys_token', res.access_token);
    setToken(res.access_token);
    setUser(res.user);
    return res.user;
  };

  const loginWithToken = async (jwtToken) => {
    localStorage.setItem('cognisys_token', jwtToken);
    setToken(jwtToken);
    try {
      const profile = await api.getMe();
      setUser(profile);
      return profile;
    } catch (err) {
      console.error('Failed to retrieve user with token:', err);
      logout();
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('cognisys_token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    loginWithToken,
    logout,
    refreshProfile: async () => {
      if (token) {
        const profile = await api.getMe();
        setUser(profile);
      }
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
