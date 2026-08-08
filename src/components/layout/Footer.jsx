import { Link } from 'react-router-dom';
import Logo from '../brand/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white transition-colors duration-200 dark:border-ink-800 dark:bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo markClassName="h-8 w-8" wordmarkClassName="text-lg font-extrabold tracking-tight text-ink-950 dark:text-white" />
            <p className="mt-3 max-w-xs text-sm text-ink-500 dark:text-ink-400">
              A marketplace for products worth owning — curated categories, fair prices, fast checkout.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-900 dark:text-white">Shop</h4>
            <ul className="mt-3 space-y-2 text-sm text-ink-500 dark:text-ink-400">
              <li><Link to="/products" className="hover:text-ink-900 dark:hover:text-white">All products</Link></li>
              <li><Link to="/orders" className="hover:text-ink-900 dark:hover:text-white">Order history</Link></li>
              <li><Link to="/cart" className="hover:text-ink-900 dark:hover:text-white">Your cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-900 dark:text-white">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-ink-500 dark:text-ink-400">
              <li><Link to="/about" className="hover:text-ink-900 dark:hover:text-white">About Onyx</Link></li>
              <li><Link to="/sustainability" className="hover:text-ink-900 dark:hover:text-white">Sustainability</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-900 dark:text-white">Support</h4>
            <ul className="mt-3 space-y-2 text-sm text-ink-500 dark:text-ink-400">
              <li><Link to="/help" className="hover:text-ink-900 dark:hover:text-white">Help center</Link></li>
              <li><Link to="/shipping-returns" className="hover:text-ink-900 dark:hover:text-white">Shipping & returns</Link></li>
              <li><Link to="/contact" className="hover:text-ink-900 dark:hover:text-white">Contact us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink-100 pt-6 text-xs text-ink-400 dark:border-ink-800 dark:text-ink-500 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Onyx. All rights reserved.</span>
          <span>Built for people who like buying nice things.</span>
        </div>
      </div>
    </footer>
  );
}
