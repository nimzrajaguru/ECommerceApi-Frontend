import { createContext, useState, useContext } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext(null)

function getStoredUser() {
  const stored = localStorage.getItem('user')
  return stored ? JSON.parse(stored) : null
}

function getRoleFromToken(token) {
  if (!token) return null
  try {
    const decoded = jwtDecode(token)
    return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(getStoredUser())

  function login(newToken, userData) {
    setToken(newToken)
    setUser(userData)
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const role = getRoleFromToken(token)
  const isAdmin = role === 'Admin'

  const value = { token, user, login, logout, role, isAdmin }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
