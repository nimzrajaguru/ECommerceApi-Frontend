import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProduct } from '../api/products';
import { createReview, listProductReviews } from '../api/reviews';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductThumb from '../components/product/ProductThumb';
import StarRating from '../components/ui/StarRating';
import Spinner from '../components/ui/Spinner';
import Reveal from '../components/motion/Reveal';
import { ChevronRightIcon } from '../components/ui/icons';
import { formatPrice } from '../utils/format';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({ rating: 5, comment: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [productRes, reviewsRes] = await Promise.all([
          getProduct(id),
          listProductReviews(id)
        ]);
        setProduct(productRes.data);
        setReviews(reviewsRes.data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    load();
    setQuantity(1);
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await createReview({ productId: Number(id), rating: Number(form.rating), comment: form.comment });
      const res = await listProductReviews(id);
      setReviews(res.data);
      setForm({ rating: 5, comment: '' });
      setMessage('Review submitted.');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Could not submit review.');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-24"><Spinner /></div>;
  }

  if (!product) {
    return (
      <div className="card px-6 py-16 text-center">
        <p className="font-semibold text-ink-900 dark:text-white">Product not found</p>
        <Link to="/products" className="btn-primary mt-4 inline-flex">Back to shop</Link>
      </div>
    );
  }

  const outOfStock = product.stockQuantity <= 0;

  return (
    <div>
      <nav className="mb-6 flex items-center gap-1 text-sm text-ink-500 dark:text-ink-400">
        <Link to="/products" className="hover:text-ink-900 dark:hover:text-white">Shop</Link>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="text-ink-900 dark:text-white">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="card overflow-hidden"
        >
          <ProductThumb name={product.name} src={product.imageUrl} className="aspect-square rounded-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">{product.categoryName}</p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink-950 dark:text-white">{product.name}</h1>
          <div className="mt-3">
            <StarRating value={product.averageRating} />
          </div>
          <p className="mt-5 text-3xl font-bold text-ink-950 dark:text-white">{formatPrice(product.price)}</p>
          <p className="mt-4 text-ink-600 dark:text-ink-300">{product.description}</p>

          <div className="mt-4">
            {outOfStock ? (
              <span className="badge bg-red-50 text-red-600 ring-1 ring-inset ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/30">Out of stock</span>
            ) : (
              <span className="badge bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30">
                {product.stockQuantity} in stock
              </span>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-ink-200 dark:border-ink-700">
              <button
                type="button"
                className="h-10 w-10 text-lg text-ink-600 hover:text-ink-950 dark:text-ink-300 dark:hover:text-white"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="w-8 text-center font-semibold dark:text-white">{quantity}</span>
              <button
                type="button"
                className="h-10 w-10 text-lg text-ink-600 hover:text-ink-950 dark:text-ink-300 dark:hover:text-white"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              className="btn-primary flex-1 !py-3"
              disabled={outOfStock}
              onClick={() => addItem(product, quantity)}
            >
              Add to cart
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-xl font-bold text-ink-950 dark:text-white">Reviews</h2>
          {isAuthenticated ? (
            <form onSubmit={submitReview} className="card mt-4 flex flex-col gap-3 p-5">
              <select className="input" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
                {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} star{value > 1 ? 's' : ''}</option>)}
              </select>
              <textarea
                className="input"
                rows="3"
                placeholder="Share your thoughts on this product"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
              />
              <button className="btn-primary self-start" type="submit">Submit review</button>
              {message && <p className="text-sm text-ink-500 dark:text-ink-400">{message}</p>}
            </form>
          ) : (
            <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">
              <Link to="/auth" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">Sign in</Link> to leave a review.
            </p>
          )}

          <div className="mt-6 flex flex-col gap-4">
            {reviews.length === 0 && <p className="text-sm text-ink-500 dark:text-ink-400">No reviews yet — be the first.</p>}
            {reviews.map((review) => (
              <div key={review.id} className="card p-4">
                <div className="flex items-center justify-between">
                  <strong className="text-ink-900 dark:text-white">{review.userName}</strong>
                  <StarRating value={review.rating} showValue={false} />
                </div>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
