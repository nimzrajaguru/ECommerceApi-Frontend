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
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', width: '200px' }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        <strong>${product.price}</strong>
      </p>
      <p>Stock: {product.stockQuantity}</p>
      <p>Category: {product.categoryName}</p>
      {token && <button onClick={handleOrder}>Order Now</button>}
      {message && <p>{message}</p>}
    </div>
  )
}

export default ProductCard
