import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { listMyOrders } from '../api/orders';
import StatusBadge from '../components/ui/StatusBadge';
import Spinner from '../components/ui/Spinner';
import StaggerGrid from '../components/motion/StaggerGrid';
import { productCardVariants } from '../components/product/ProductCard';
import { formatDate, formatPrice } from '../utils/format';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listMyOrders()
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink-950 dark:text-white">My orders</h1>

      {loading ? (
        <div className="flex justify-center py-24"><Spinner /></div>
      ) : orders.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card px-6 py-16 text-center">
          <p className="font-semibold text-ink-900 dark:text-white">No orders yet</p>
          <Link className="btn-primary mt-4 inline-flex" to="/products">Start shopping</Link>
        </motion.div>
      ) : (
        <StaggerGrid className="flex flex-col gap-4">
          {orders.map((order) => (
            <motion.div variants={productCardVariants} className="card p-5" key={order.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-ink-950 dark:text-white">Order #{order.id}</h3>
                  <p className="text-sm text-ink-500 dark:text-ink-400">{formatDate(order.orderDate)}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <ul className="mt-4 flex flex-col gap-1 border-t border-ink-100 pt-3 text-sm text-ink-600 dark:border-ink-800 dark:text-ink-300">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.productName} × {item.quantity}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-right font-bold text-ink-950 dark:text-white">Total: {formatPrice(order.totalAmount)}</p>
            </motion.div>
          ))}
        </StaggerGrid>
      )}
    </div>
  );
}
