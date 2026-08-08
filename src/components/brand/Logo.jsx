function Mark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" className="fill-ink-950" />
      <circle cx="20" cy="20" r="11" stroke="white" strokeWidth="5.5" />
      <circle cx="27.5" cy="27.5" r="4.5" className="fill-brand-500" />
    </svg>
  );
}

export default function Logo({ className = '', markClassName, wordmarkClassName, showWordmark = true }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className={markClassName || 'h-9 w-9'} />
      {showWordmark && (
        <span className={wordmarkClassName || 'text-xl font-extrabold tracking-tight text-ink-950'}>
          onyx
        </span>
      )}
    </span>
  );
}
