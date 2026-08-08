import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../brand/Logo';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { CartIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon, XIcon } from '../ui/icons';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Shop' }
];

function navLinkClass({ isActive }) {
  return `text-sm font-medium transition-colors ${isActive ? 'text-ink-950 dark:text-white' : 'text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white'}`;
}

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { itemCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(query ? `/products?q=${encodeURIComponent(query)}` : '/products');
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur transition-colors duration-200 dark:border-ink-800 dark:bg-ink-950/90">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="shrink-0">
          <Logo markClassName="h-8 w-8" wordmarkClassName="text-lg font-extrabold tracking-tight text-ink-950 dark:text-white" />
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink to="/orders" className={navLinkClass}>Orders</NavLink>
          )}
          {user?.roles?.includes('Admin') && (
            <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
          )}
        </nav>

        <form onSubmit={submitSearch} className="relative ml-auto hidden max-w-sm flex-1 md:block">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            className="input !py-2 pl-9"
            placeholder="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'moon' : 'sun'}
                initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                {isDark ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>

          <NavLink
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
            aria-label="Cart"
          >
            <CartIcon className="h-5 w-5" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-semibold text-white"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>

          {isAuthenticated ? (
            <button type="button" onClick={logout} className="btn-secondary hidden !px-4 !py-2 text-sm sm:inline-flex">
              Sign out
            </button>
          ) : (
            <NavLink to="/auth" className="btn-primary hidden !px-4 !py-2 text-sm sm:inline-flex">
              Sign in
            </NavLink>
          )}

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-ink-100 dark:border-ink-800 md:hidden"
          >
            <div className="px-4 py-4">
              <form onSubmit={submitSearch} className="relative mb-4">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  className="input !py-2 pl-9"
                  placeholder="Search products"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </NavLink>
                ))}
                {isAuthenticated && (
                  <NavLink to="/orders" className={navLinkClass} onClick={() => setMenuOpen(false)}>Orders</NavLink>
                )}
                {user?.roles?.includes('Admin') && (
                  <NavLink to="/admin" className={navLinkClass} onClick={() => setMenuOpen(false)}>Admin</NavLink>
                )}
                {isAuthenticated ? (
                  <button type="button" onClick={() => { logout(); setMenuOpen(false); }} className="btn-secondary mt-2 w-full">
                    Sign out
                  </button>
                ) : (
                  <NavLink to="/auth" className="btn-primary mt-2 w-full" onClick={() => setMenuOpen(false)}>
                    Sign in
                  </NavLink>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
