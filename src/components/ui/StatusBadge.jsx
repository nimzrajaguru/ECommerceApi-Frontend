const STATUS_STYLES = {
  Pending: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/30',
  Processing: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/30',
  Shipped: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:ring-violet-500/30',
  Delivered: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30',
  Cancelled: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/30'
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-ink-100 text-ink-700 ring-1 ring-inset ring-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:ring-ink-700';
  return <span className={`badge ${style}`}>{status}</span>;
}
