import { createContext, useState, useContext } from 'react'
import { jwtDecode } from 'jwt-decode'

// Global auth state — avoids prop drilling by making token/user/role
// available to any component via useAuth() below.
const AuthContext = createContext(null)

// Restores the logged-in user after a page refresh (React state alone
// resets on reload; localStorage persists across it).
function getStoredUser() {
  const stored = localStorage.getItem('user')
  return stored ? JSON.parse(stored) : null
}

// Decodes the JWT to read the role claim. ASP.NET Core Identity uses the
// full legacy claim URI, not a plain "role" key.
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

  // Called after successful login/register. Persists to localStorage
  // so the session survives a refresh.
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

  // Recomputed from the current token on every render, so it's never stale.
  const role = getRoleFromToken(token)
  const isAdmin = role === 'Admin'

  const value = { token, user, login, logout, role, isAdmin }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
