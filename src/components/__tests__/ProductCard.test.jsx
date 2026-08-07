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

  it('displays the stock quantity', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText(/Stock: 10/)).toBeInTheDocument()
  })
})
