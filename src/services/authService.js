import api from './api.js'

export async function login(email, password) {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export async function register(email, password, firstName, lastName) {
  const response = await api.post('/auth/register', {
    email,
    password,
    firstName,
    lastName,
  })
  return response.data
}
