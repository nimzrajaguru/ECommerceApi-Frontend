import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { listProducts, createProduct, deleteProduct } from '../../api/products';
import { listCategories, createCategory, deleteCategory } from '../../api/categories';
import { listAllOrders, updateOrderStatus } from '../../api/orders';
import { listUsers, updateUserRole, deleteUser } from '../../api/users';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/ui/Spinner';
import StaggerGrid from '../../components/motion/StaggerGrid';
import { productCardVariants } from '../../components/product/ProductCard';
import ProductsSection from './sections/ProductsSection';
import CategoriesSection from './sections/CategoriesSection';
import OrdersSection from './sections/OrdersSection';
import UsersSection from './sections/UsersSection';
import { formatPrice } from '../../utils/format';

const TABS = [
  { id: 'products', label: 'Products' },
  { id: 'categories', label: 'Categories' },
  { id: 'orders', label: 'Orders' },
  { id: 'users', label: 'Users' }
];

export default function AdminPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('products');

  const loadData = async () => {
    const [productsRes, categoriesRes, ordersRes, usersRes] = await Promise.allSettled([
      listProducts(),
      listCategories(),
      listAllOrders(),
      listUsers()
    ]);
    setProducts(productsRes.status === 'fulfilled' ? productsRes.value.data : []);
    setCategories(categoriesRes.status === 'fulfilled' ? categoriesRes.value.data : []);
    setOrders(ordersRes.status === 'fulfilled' ? ordersRes.value.data : []);
    setUsers(usersRes.status === 'fulfilled' ? usersRes.value.data : []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const stats = [
    { label: 'Products', value: products.length },
    { label: 'Categories', value: categories.length },
    { label: 'Orders', value: orders.length },
    { label: 'Users', value: users.length },
    { label: 'Revenue', value: formatPrice(revenue) }
  ];

  if (loading) {
    return <div className="flex justify-center py-24"><Spinner /></div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink-950 dark:text-white">Admin dashboard</h1>

      <StaggerGrid className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={productCardVariants} className="card p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-400 dark:text-ink-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-ink-950 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </StaggerGrid>

      <div className="mb-6 flex gap-2 border-b border-ink-100 dark:border-ink-800">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`relative -mb-px px-3 py-2 text-sm font-semibold transition-colors ${tab === t.id ? 'text-ink-950 dark:text-white' : 'text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white'}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {tab === t.id && (
              <motion.span layoutId="admin-tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-ink-950 dark:bg-white" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
        >
          {tab === 'products' && (
            <ProductsSection
              products={products}
              categories={categories}
              onCreate={async (payload) => { await createProduct(payload); await loadData(); }}
              onDelete={async (id) => { await deleteProduct(id); await loadData(); }}
            />
          )}
          {tab === 'categories' && (
            <CategoriesSection
              categories={categories}
              onCreate={async (payload) => { await createCategory(payload); await loadData(); }}
              onDelete={async (id) => { await deleteCategory(id); await loadData(); }}
            />
          )}
          {tab === 'orders' && (
            <OrdersSection
              orders={orders}
              onUpdateStatus={async (orderId, status) => { await updateOrderStatus(orderId, status); await loadData(); }}
            />
          )}
          {tab === 'users' && (
            <UsersSection
              users={users}
              currentUserEmail={user?.email}
              onChangeRole={async (id, role) => { await updateUserRole(id, role); await loadData(); }}
              onDelete={async (id) => {
                if (!window.confirm('Delete this user? This cannot be undone.')) return;
                await deleteUser(id);
                await loadData();
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
