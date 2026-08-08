import { api } from './client';

export const listCategories = () => api.get('/categories');
export const createCategory = (payload) => api.post('/categories', payload);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
