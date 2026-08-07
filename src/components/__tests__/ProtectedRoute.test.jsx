import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext.jsx'
import ProtectedRoute from '../ProtectedRoute.jsx'

describe('ProtectedRoute', () => {
  it('redirects to login when there is no token', () => {
    localStorage.removeItem('token')

    render(
      <MemoryRouter initialEntries={['/orders']}>
        <AuthProvider>
          <Routes>
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <p>Secret Orders Content</p>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<p>Login Page</p>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Secret Orders Content')).not.toBeInTheDocument()
  })

  it('shows the protected content when a token exists', () => {
    localStorage.setItem('token', 'fake-test-token')

    render(
      <MemoryRouter initialEntries={['/orders']}>
        <AuthProvider>
          <Routes>
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <p>Secret Orders Content</p>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<p>Login Page</p>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Secret Orders Content')).toBeInTheDocument()

    localStorage.removeItem('token')
  })
})
