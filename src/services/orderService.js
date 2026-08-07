import api from './api.js'

export async function getMyOrders() {
  const response = await api.get('/orders/mine')
  return response.data
}
