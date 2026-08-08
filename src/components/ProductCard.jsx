import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { createOrder } from '../services/orderService.js'

function ProductCard({ product }) {
  const { token } = useAuth()
  const [message, setMessage] = useState('')

  async function handleOrder() {
    setMessage('')
    try {
      await createOrder(
        [{ productId: product.id, quantity: 1 }],
        '123 Test Street'
      )
      setMessage('Order placed successfully!')
    } catch (err) {
      const backendMessage = err.response?.data?.message
      setMessage(backendMessage || 'Failed to place order.')
    }
  }

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <div
          className="d-flex align-items-center justify-content-center text-white fw-bold fs-1"
          style={{
            height: '140px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
            borderRadius: '12px 12px 0 0',
          }}
        >
          {product.name.charAt(0).toUpperCase()}
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/products/${product.id}`} className="text-decoration-none">
              {product.name}
            </Link>
          </h5>
          <p className="card-text text-muted small">{product.description}</p>
          <p className="card-text">
            <strong>${product.price}</strong>
          </p>
          <div className="mb-2">
            <span className="badge rounded-pill text-bg-light border me-1">
              {product.categoryName}
            </span>
            {product.stockQuantity === 0 ? (
              <span className="badge rounded-pill text-bg-danger">Out of Stock</span>
            ) : product.stockQuantity < 10 ? (
              <span className="badge rounded-pill text-bg-warning">Low Stock</span>
            ) : (
              <span className="badge rounded-pill text-bg-success">In Stock</span>
            )}
          </div>
          {token && (
            <button
              className="btn btn-primary mt-auto"
              onClick={handleOrder}
              disabled={product.stockQuantity === 0}
            >
              {product.stockQuantity === 0 ? 'Out of Stock' : 'Order Now'}
            </button>
          )}
          {message && <p className="small mt-2">{message}</p>}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
