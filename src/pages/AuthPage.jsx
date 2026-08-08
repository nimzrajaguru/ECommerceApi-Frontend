import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/brand/Logo';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login({ email: form.email, password: form.password });
      } else {
        await register({ email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName });
      }
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-8">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Logo markClassName="h-11 w-11" wordmarkClassName="text-2xl font-extrabold tracking-tight text-ink-950 dark:text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="card mt-8 w-full p-6 sm:p-8"
      >
        <div className="mb-6 flex rounded-full bg-ink-100 p-1 dark:bg-ink-800">
          <button
            type="button"
            className={`relative flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${mode === 'login' ? 'text-ink-950 dark:text-white' : 'text-ink-500 dark:text-ink-400'}`}
            onClick={() => setMode('login')}
          >
            {mode === 'login' && (
              <motion.span layoutId="auth-tab" className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-ink-700" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
            )}
            <span className="relative">Sign in</span>
          </button>
          <button
            type="button"
            className={`relative flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${mode === 'register' ? 'text-ink-950 dark:text-white' : 'text-ink-500 dark:text-ink-400'}`}
            onClick={() => setMode('register')}
          >
            {mode === 'register' && (
              <motion.span layoutId="auth-tab" className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-ink-700" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
            )}
            <span className="relative">Create account</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {mode === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="input"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                  <input
                    className="input"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <input
            className="input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          <button className="btn-primary mt-2 w-full" type="submit" disabled={submitting}>
            {submitting ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
