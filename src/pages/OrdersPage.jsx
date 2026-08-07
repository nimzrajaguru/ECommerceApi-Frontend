import { useState, useEffect } from 'react'
import { getMyOrders } from '../services/orderService.js'

const statusLabels = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getMyOrders()
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load your orders.')
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading your orders...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ border: '1px solid #ccc', padding: '12px', margin: '8px' }}>
            <p>Order #{order.id} — Status: {statusLabels[order.status]}</p>
            <p>Total: ${order.totalAmount}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default OrdersPage
