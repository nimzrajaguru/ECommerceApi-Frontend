import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { listProducts } from '../api/products';
import { listCategories } from '../api/categories';
import { useCart } from '../context/CartContext';
import ProductCard, { productCardVariants } from '../components/product/ProductCard';
import Spinner from '../components/ui/Spinner';
import Reveal from '../components/motion/Reveal';
import StaggerGrid from '../components/motion/StaggerGrid';
import HeroIllustration from '../components/brand/HeroIllustration';
import { getCategoryIcon } from '../components/ui/categoryIcons';
import { BadgeCheckIcon, ChevronRightIcon, RefreshIcon, ShieldCheckIcon, TruckIcon } from '../components/ui/icons';

const PERKS = [
  { title: 'Free shipping', detail: 'On every order, no minimum spend.', icon: TruckIcon },
  { title: 'Secure checkout', detail: 'Your payment details stay protected.', icon: ShieldCheckIcon },
  { title: 'Easy returns', detail: '30 days to change your mind.', icon: RefreshIcon },
  { title: 'Verified reviews', detail: 'Real feedback from real buyers.', icon: BadgeCheckIcon }
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

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

  return (
    <div className="flex flex-col gap-16">
      <section className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-16 text-white sm:px-12 sm:py-24">
        <div className="bg-hero-grid absolute inset-0 opacity-40" style={{ backgroundSize: '32px 32px' }} />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
          >
            <span className="badge bg-white/10 text-brand-200 ring-1 ring-inset ring-white/20">The marketplace, refined</span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Shop smarter. <span className="text-brand-400">Own better.</span>
            </h1>
            <p className="mt-4 text-base text-ink-200 sm:text-lg">
              Onyx curates quality products across every category — browse the catalog, compare honestly, and check out in seconds.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link to="/products" className="btn-primary bg-brand-600 hover:bg-brand-500 !px-6 !py-3 text-base">
                Browse products
              </Link>
              <Link to="/auth" className="btn bg-white/10 text-white ring-1 ring-inset ring-white/20 hover:bg-white/20 !px-6 !py-3 text-base">
                Create an account
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="mx-auto hidden lg:block"
          >
            <HeroIllustration className="h-72 w-72" />
          </motion.div>
        </div>
      </section>

      {categories.length > 0 && (
        <section>
          <Reveal as="div" className="mb-5 flex items-end justify-between">
            <h2 className="text-xl font-bold text-ink-950 dark:text-white">Shop by category</h2>
          </Reveal>
          <StaggerGrid className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.name);
              return (
                <motion.div key={category.id} variants={productCardVariants}>
                  <Link
                    to={`/products?category=${category.id}`}
                    className="card flex min-w-[200px] items-start gap-3 px-5 py-4 hover:shadow-card-hover"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-semibold text-ink-900 dark:text-white">{category.name}</span>
                      <span className="line-clamp-1 text-xs text-ink-500 dark:text-ink-400">{category.description}</span>
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </StaggerGrid>
        </section>
      )}

      <section>
        <Reveal as="div" className="mb-5 flex items-end justify-between">
          <h2 className="text-xl font-bold text-ink-950 dark:text-white">Featured products</h2>
          <Link to="/products" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
            View all <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>

        {loading ? (
          <div className="flex justify-center py-16"><Spinner /></div>
        ) : products.length === 0 ? (
          <p className="text-ink-500 dark:text-ink-400">No products available right now.</p>
        ) : (
          <StaggerGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={(p) => addItem(p, 1)} />
            ))}
          </StaggerGrid>
        )}
      </section>

      <StaggerGrid className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {PERKS.map((perk) => (
          <motion.div
            key={perk.title}
            variants={productCardVariants}
            whileHover="hover"
            className="card p-5"
          >
            <motion.span
              variants={{ hover: { scale: 1.12, rotate: -6 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
            >
              <perk.icon className="h-5 w-5" />
            </motion.span>
            <p className="mt-3 font-semibold text-ink-900 dark:text-white">{perk.title}</p>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{perk.detail}</p>
          </motion.div>
        ))}
      </StaggerGrid>
    </div>
  );
}
