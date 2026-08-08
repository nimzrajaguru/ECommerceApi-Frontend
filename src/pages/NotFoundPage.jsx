import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="card mx-auto max-w-lg px-6 py-16 text-center">
      <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">404</p>
      <h1 className="mt-2 text-2xl font-bold text-ink-950 dark:text-white">Page not found</h1>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">The page you're looking for doesn't exist.</p>
      <Link className="btn-primary mt-5 inline-flex" to="/">Back to home</Link>
    </div>
  );
}
