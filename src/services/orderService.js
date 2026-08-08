import api from './api.js'

export async function getMyOrders() {
  const response = await api.get('/orders/mine')
  return response.data
}

// Note: we only ever send productId and quantity — never a price.
// The backend calculates the real price server-side, so the client
// can't tamper with order totals.
export async function createOrder(items, shippingAddress) {
  const response = await api.post('/orders', {
    shippingAddress,
    items,
  })
  return response.data
}
