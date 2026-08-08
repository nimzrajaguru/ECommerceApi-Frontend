import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listProducts } from '../api/products';
import { listCategories } from '../api/categories';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';
import Spinner from '../components/ui/Spinner';
import StaggerGrid from '../components/motion/StaggerGrid';
import { SearchIcon } from '../components/ui/icons';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();

  const query = searchParams.get('q') || '';
  const categoryId = searchParams.get('category') || 'all';

  useEffect(() => {
    Promise.all([listProducts(), listCategories()])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      })
      .catch(() => {
        setProducts([]);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const setQuery = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('q', value); else next.delete('q');
    setSearchParams(next, { replace: true });
  };

  const setCategoryId = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== 'all') next.set('category', value); else next.delete('category');
    setSearchParams(next, { replace: true });
  };

  const filtered = products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) || (product.description || '').toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryId === 'all' || product.categoryId === Number(categoryId);
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-950 dark:text-white">Shop all products</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{filtered.length} product{filtered.length === 1 ? '' : 's'} available</p>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            className="input pl-9"
            placeholder="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="input sm:w-56" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Spinner /></div>
      ) : filtered.length === 0 ? (
        <div className="card px-6 py-16 text-center">
          <p className="font-semibold text-ink-900 dark:text-white">No products match your filters</p>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Try a different search term or category.</p>
        </div>
      ) : (
        <StaggerGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={(p) => addItem(p, 1)} />
          ))}
        </StaggerGrid>
      )}
    </div>
  );
}
