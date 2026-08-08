import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductThumb from './ProductThumb';
import StarRating from '../ui/StarRating';
import { formatPrice } from '../../utils/format';

export const productCardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

export default function ProductCard({ product, onAddToCart }) {
  const outOfStock = product.stockQuantity <= 0;

  return (
    <motion.div
      variants={productCardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card group flex h-full flex-col overflow-hidden hover:shadow-card-hover"
    >
      <Link to={`/products/${product.id}`} className="block overflow-hidden">
        <ProductThumb name={product.name} src={product.imageUrl} className="aspect-square transition-transform duration-300 group-hover:scale-105" />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">{product.categoryName}</p>
        <Link to={`/products/${product.id}`} className="line-clamp-1 font-semibold text-ink-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-400">
          {product.name}
        </Link>
        <p className="line-clamp-2 text-sm text-ink-500 dark:text-ink-400">{product.description}</p>

        {typeof product.averageRating === 'number' && <StarRating value={product.averageRating} />}

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-ink-950 dark:text-white">{formatPrice(product.price)}</span>
          {outOfStock ? (
            <span className="badge bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-400">Out of stock</span>
          ) : (
            <span className="text-xs text-ink-400 dark:text-ink-500">{product.stockQuantity} in stock</span>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Link to={`/products/${product.id}`} className="btn-secondary flex-1 !px-3 !py-2 text-sm">
            Details
          </Link>
          {onAddToCart && (
            <button
              type="button"
              className="btn-primary flex-1 !px-3 !py-2 text-sm"
              disabled={outOfStock}
              onClick={() => onAddToCart(product)}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
