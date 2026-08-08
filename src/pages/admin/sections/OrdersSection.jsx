import StatusBadge from '../../../components/ui/StatusBadge';
import { formatPrice } from '../../../utils/format';

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function OrdersSection({ orders, onUpdateStatus }) {
  return (
    <div className="card p-5">
      <h3 className="font-bold text-ink-950 dark:text-white">Orders ({orders.length})</h3>
      <div className="mt-3 divide-y divide-ink-100 dark:divide-ink-800">
        {orders.map((order) => (
          <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <strong className="text-ink-900 dark:text-white">Order #{order.id}</strong>
                <StatusBadge status={order.status} />
              </div>
              <p className="text-sm text-ink-500 dark:text-ink-400">{order.shippingAddress || 'No address'} · {formatPrice(order.totalAmount)}</p>
            </div>
            <select
              className="input w-auto !py-1.5 text-sm"
              value={order.status}
              onChange={(e) => onUpdateStatus(order.id, e.target.value)}
            >
              {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
