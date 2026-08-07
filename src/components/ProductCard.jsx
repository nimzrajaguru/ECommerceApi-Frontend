import { useState } from 'react'
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
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted small">{product.description}</p>
          <p className="card-text">
            <strong>${product.price}</strong>
          </p>
          <p className="card-text small">
            Stock: {product.stockQuantity} &middot; {product.categoryName}
          </p>
          {token && (
            <button className="btn btn-primary mt-auto" onClick={handleOrder}>
              Order Now
            </button>
          )}
          {message && <p className="small mt-2">{message}</p>}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
