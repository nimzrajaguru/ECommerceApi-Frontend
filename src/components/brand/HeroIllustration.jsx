import { motion } from 'framer-motion';

export default function HeroIllustration({ className = 'h-64 w-64' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0">
        <motion.div
          className="absolute left-2 top-4 h-40 w-40 rounded-full bg-brand-500/30 blur-3xl"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-2 right-4 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>

      <motion.svg
        viewBox="0 0 240 240"
        fill="none"
        className="relative h-full w-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="52" y="88" width="136" height="112" rx="16" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.5" strokeWidth="2" />
        <path d="M84 88v-16a36 36 0 0 1 72 0v16" stroke="white" strokeOpacity="0.6" strokeWidth="7" strokeLinecap="round" />
        <circle cx="120" cy="138" r="10" fill="#6a5cf5" />
        <path d="M100 168h40" stroke="white" strokeOpacity="0.4" strokeWidth="6" strokeLinecap="round" />

        <motion.circle
          cx="196" cy="60" r="8" fill="#f59e0b"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="44" cy="70" r="6" fill="#6a5cf5"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        <motion.rect
          x="30" y="150" width="16" height="16" rx="4" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="3"
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '38px 158px' }}
        />
      </motion.svg>
    </div>
  );
}
