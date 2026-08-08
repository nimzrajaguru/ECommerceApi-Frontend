import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext.jsx'
import AdminRoute from '../AdminRoute.jsx'

// A fake but structurally valid JWT with role "Customer", for testing role-based access.
// Header/payload are real base64, signature is fake — fine since we only decode, never verify, on the frontend.
const customerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDdXN0b21lciJ9.fake-signature'

const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiJ9.fake-signature'

function renderAdminRoute() {
  return render(
    <MemoryRouter initialEntries={['/admin/products']}>
      <AuthProvider>
        <Routes>
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <p>Admin Only Content</p>
              </AdminRoute>
            }
          />
          <Route path="/login" element={<p>Login Page</p>} />
          <Route path="/" element={<p>Home Page</p>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('AdminRoute', () => {
  it('redirects to login when there is no token at all', () => {
    localStorage.removeItem('token')
    renderAdminRoute()
    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })

  it('redirects to home when logged in as a non-Admin role', () => {
    localStorage.setItem('token', customerToken)
    renderAdminRoute()
    expect(screen.getByText('Home Page')).toBeInTheDocument()
    expect(screen.queryByText('Admin Only Content')).not.toBeInTheDocument()
    localStorage.removeItem('token')
  })

  it('shows the admin content when logged in with the Admin role', () => {
    localStorage.setItem('token', adminToken)
    renderAdminRoute()
    expect(screen.getByText('Admin Only Content')).toBeInTheDocument()
    localStorage.removeItem('token')
  })
})
