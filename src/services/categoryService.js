import api from './api.js'

export async function getAllCategories() {
  const response = await api.get('/categories')
  return response.data
}
