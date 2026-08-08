import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { loginRequest, registerRequest } from '../api/auth';
import { parseJwt } from '../utils/jwt';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const payload = parseJwt(token);
    const roles = payload?.role || payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const normalizedRoles = Array.isArray(roles) ? roles : roles ? [roles] : [];

    setUser({
      email: payload?.email || localStorage.getItem('userEmail') || '',
      firstName: payload?.given_name || localStorage.getItem('userName') || 'Customer',
      roles: normalizedRoles
    });
    setLoading(false);
  }, [token]);

  const persistSession = (data) => {
    const { token: accessToken, refreshToken, email, firstName } = data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', firstName || 'Customer');
    setToken(accessToken);
  };

  const login = async (credentials) => {
    const response = await loginRequest(credentials);
    persistSession(response.data);
    return response.data;
  };

  const register = async (credentials) => {
    const response = await registerRequest(credentials);
    persistSession(response.data);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    delete api.defaults.headers.common.Authorization;
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    token,
    loading,
    isAuthenticated: Boolean(token),
    isAdmin: user?.roles?.includes('Admin') || false,
    login,
    register,
    logout
  }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
