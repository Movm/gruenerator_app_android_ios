import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/authService';
import { TokenStorage } from '../services/tokenStorage';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  console.log('[DEBUG] AuthProvider initializing');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('[DEBUG] AuthProvider useEffect - skipping auth check (optional mode)');
    // Skip authentication check for now
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('[DEBUG] AuthContext - Starting auth status check');
      setIsLoading(true);
      
      console.log('[DEBUG] AuthContext - Calling AuthService.checkAuthStatus');
      const { isAuthenticated, user } = await AuthService.checkAuthStatus();
      
      console.log('[DEBUG] AuthContext - Auth check result:', { isAuthenticated, user: user ? 'USER_OBJECT' : null });
      setIsAuthenticated(isAuthenticated);
      setUser(user);
      
      console.log('[DEBUG] AuthContext - Auth state updated successfully');
    } catch (error) {
      console.error('[AuthContext] Auth check error:', error);
      console.error('[AuthContext] Error stack:', error.stack);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      console.log('[DEBUG] AuthContext - Setting isLoading to false');
      setIsLoading(false);
    }
  };

  const login = async (provider) => {
    try {
      setIsLoading(true);
      const result = await AuthService.loginWithProvider(provider);
      
      if (result.success) {
        setIsAuthenticated(true);
        setUser(result.user);
        return { success: true, user: result.user };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('[AuthContext] Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AuthService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('[AuthContext] Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAuth = async () => {
    return await checkAuthStatus();
  };

  const getAuthToken = async () => {
    try {
      const tokens = await TokenStorage.getTokens();
      return tokens ? tokens.access_token : null;
    } catch (error) {
      console.error('[AuthContext] Get token error:', error);
      return null;
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshAuth,
    getAuthToken,
  };

  console.log('[DEBUG] AuthProvider rendering with state:', { 
    isAuthenticated, 
    isLoading, 
    user: user ? 'USER_OBJECT' : null 
  });
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};