import { api } from './client';

export const listMyOrders = () => api.get('/orders/mine');
export const listAllOrders = () => api.get('/orders');
export const placeOrder = (payload) => api.post('/orders', payload);
export const updateOrderStatus = (orderId, status) => api.put(`/orders/${orderId}/status`, { status });
