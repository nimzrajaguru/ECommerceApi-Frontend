export default function Spinner({ className = 'h-6 w-6' }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-ink-200 border-t-ink-900 dark:border-ink-700 dark:border-t-white ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
