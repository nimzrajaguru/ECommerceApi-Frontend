import api from './api.js'

export async function getMyOrders() {
  const response = await api.get('/orders/mine')
  return response.data
}

export async function createOrder(items, shippingAddress) {
  const response = await api.post('/orders', {
    shippingAddress,
    items,
  })
  return response.data
}
