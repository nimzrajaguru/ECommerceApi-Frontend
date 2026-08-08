import { useState } from 'react';

const GRADIENTS = [
  'from-brand-100 to-brand-300',
  'from-amber-100 to-amber-300',
  'from-emerald-100 to-emerald-300',
  'from-rose-100 to-rose-300',
  'from-sky-100 to-sky-300',
  'from-violet-100 to-violet-300'
];

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % GRADIENTS.length;
  }
  return Math.abs(hash);
}

export default function ProductThumb({ name = '', src, className = 'aspect-square' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const gradient = GRADIENTS[hashString(name)];
  const initial = name.trim().charAt(0).toUpperCase() || '?';

  if (src && !imageFailed) {
    return (
      <div className={`relative overflow-hidden rounded-t-2xl bg-ink-100 dark:bg-ink-800 ${className}`}>
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br ${gradient} ${className}`}>
      <span className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold text-white/70">
        {initial}
      </span>
    </div>
  );
}
