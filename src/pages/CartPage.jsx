import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../api/orders';
import ProductThumb from '../components/product/ProductThumb';
import { TrashIcon } from '../components/ui/icons';
import { formatPrice } from '../utils/format';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState('');
  const [message, setMessage] = useState('');
  const [placing, setPlacing] = useState(false);

  const checkout = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    setPlacing(true);
    setMessage('');
    try {
      await placeOrder({
        shippingAddress,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity
        }))
      });
      clearCart();
      setMessage('Order placed successfully.');
      setShippingAddress('');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Could not place order');
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card mx-auto max-w-lg px-6 py-16 text-center"
      >
        <h2 className="text-xl font-bold text-ink-950 dark:text-white">Your cart is empty</h2>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Add something you like to see it here.</p>
        <Link className="btn-primary mt-5 inline-flex" to="/products">Continue shopping</Link>
      </motion.div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink-950 dark:text-white">Your cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="card divide-y divide-ink-100 dark:divide-ink-800 lg:col-span-2">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 overflow-hidden p-4"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <ProductThumb name={item.product.name} src={item.product.imageUrl} className="aspect-square rounded-none" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link to={`/products/${item.product.id}`} className="font-semibold text-ink-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-400">
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-ink-500 dark:text-ink-400">{formatPrice(item.product.price)} each</p>
                </div>
                <div className="flex items-center rounded-full border border-ink-200 dark:border-ink-700">
                  <button
                    type="button"
                    className="h-9 w-9 text-ink-600 hover:text-ink-950 dark:text-ink-300 dark:hover:text-white"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="w-7 text-center text-sm font-semibold dark:text-white">{item.quantity}</span>
                  <button
                    type="button"
                    className="h-9 w-9 text-ink-600 hover:text-ink-950 dark:text-ink-300 dark:hover:text-white"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="w-20 shrink-0 text-right font-semibold text-ink-950 dark:text-white">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
                <button
                  type="button"
                  className="text-ink-400 hover:text-red-600 dark:text-ink-500 dark:hover:text-red-400"
                  aria-label="Remove item"
                  onClick={() => removeItem(item.product.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="card h-fit p-5">
          <h2 className="text-lg font-bold text-ink-950 dark:text-white">Order summary</h2>
          <textarea
            className="input mt-4"
            rows="3"
            placeholder="Shipping address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
          <div className="mt-4 flex items-center justify-between text-sm text-ink-500 dark:text-ink-400">
            <span>Subtotal</span>
            <span className="font-semibold text-ink-900 dark:text-white">{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-sm text-ink-500 dark:text-ink-400">
            <span>Shipping</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Free</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-3 text-base dark:border-ink-800">
            <span className="font-semibold text-ink-950 dark:text-white">Total</span>
            <span className="font-bold text-ink-950 dark:text-white">{formatPrice(subtotal)}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            className="btn-primary mt-5 w-full"
            onClick={checkout}
            disabled={placing}
          >
            {placing ? 'Placing order…' : 'Place order'}
          </motion.button>
          {message && <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">{message}</p>}
        </div>
      </div>
    </div>
  );
}
