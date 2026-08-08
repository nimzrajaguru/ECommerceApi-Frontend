export default function StarRating({ value = 0, size = 'text-sm', showValue = true }) {
  const rounded = Math.round(value);

  return (
    <span className={`inline-flex items-center gap-1 ${size}`}>
      <span className="text-amber-500 tracking-tight">
        {'★'.repeat(Math.max(0, Math.min(5, rounded)))}
        <span className="text-ink-200 dark:text-ink-700">{'★'.repeat(5 - Math.max(0, Math.min(5, rounded)))}</span>
      </span>
      {showValue && <span className="text-ink-500 dark:text-ink-400">{Number(value).toFixed(1)}</span>}
    </span>
  );
}
