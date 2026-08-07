import api from './api.js'

export async function getAllProducts() {
  const response = await api.get('/products')
  return response.data
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`)
  return response.data
}
