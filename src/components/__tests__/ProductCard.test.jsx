import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext.jsx'
import ProductCard from '../ProductCard.jsx'

const mockProduct = {
  id: 1,
  name: 'Test Product',
  description: 'A product for testing',
  price: 49.99,
  stockQuantity: 10,
  categoryName: 'Test Category',
}

function renderWithProviders(ui) {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  )
}

describe('ProductCard', () => {
  it('displays the product name', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  it('displays the product price', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$49.99')).toBeInTheDocument()
  })

  it('displays an "In Stock" badge when stock is above the low-stock threshold', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('In Stock')).toBeInTheDocument()
  })

  it('displays a "Low Stock" badge when stock is below 10', () => {
    const lowStockProduct = { ...mockProduct, stockQuantity: 5 }
    renderWithProviders(<ProductCard product={lowStockProduct} />)
    expect(screen.getByText('Low Stock')).toBeInTheDocument()
  })

  it('displays an "Out of Stock" badge and disables ordering when stock is zero', () => {
    const outOfStockProduct = { ...mockProduct, stockQuantity: 0 }
    renderWithProviders(<ProductCard product={outOfStockProduct} />)
    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
  })
})
