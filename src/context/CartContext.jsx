import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cartItems') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems((curr) => {
      const existing = curr.find((item) => item.product.id === product.id);
      if (existing) {
        return curr.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...curr, { product, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setItems((curr) => curr.flatMap((item) => item.product.id === productId ? (quantity > 0 ? [{ ...item, quantity }] : []) : [item]));
  };

  const removeItem = (productId) => {
    setItems((curr) => curr.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo(() => ({
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    itemCount
  }), [items, subtotal, itemCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
