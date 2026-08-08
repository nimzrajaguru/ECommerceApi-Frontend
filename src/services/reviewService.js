import api from './api.js'

export async function getReviewsByProduct(productId) {
  const response = await api.get(`/reviews/product/${productId}`)
  return response.data
}

export async function createReview(productId, rating, comment) {
  const response = await api.post('/reviews', { productId, rating, comment })
  return response.data
}

export async function deleteReview(id) {
  await api.delete(`/reviews/${id}`)
}
