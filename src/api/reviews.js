import { api } from './client';

export const listProductReviews = (productId) => api.get(`/reviews/product/${productId}`);
export const createReview = (payload) => api.post('/reviews', payload);
