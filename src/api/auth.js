import { api } from './client';

export const loginRequest = (credentials) => api.post('/auth/login', credentials);
export const registerRequest = (credentials) => api.post('/auth/register', credentials);
