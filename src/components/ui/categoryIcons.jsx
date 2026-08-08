const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

function ChipIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

function ShirtIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M8 4 4 7l2.5 3L8 9v11h8V9l1.5 1L20 7l-4-3-2 2h-4Z" />
    </svg>
  );
}

function BookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    </svg>
  );
}

function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}

function DumbbellIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 9v6M2 10.5v3M20 9v6M22 10.5v3M8 12h8" />
      <rect x="5.5" y="7.5" width="3" height="9" rx="1" />
      <rect x="15.5" y="7.5" width="3" height="9" rx="1" />
    </svg>
  );
}

function ToyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="8" cy="8" r="4" />
      <path d="M8 12v9M4 21h8M14 5h6M17 2v6" />
    </svg>
  );
}

function TagIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12.6 3H5.4A2.4 2.4 0 0 0 3 5.4v7.2c0 .6.24 1.2.7 1.7l8.4 8.4c.9.9 2.5.9 3.4 0l6.2-6.2c.9-.9.9-2.5 0-3.4l-8.4-8.4A2.4 2.4 0 0 0 12.6 3Z" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const RULES = [
  { keywords: ['electronic', 'tech', 'gadget', 'computer'], icon: ChipIcon },
  { keywords: ['home', 'kitchen', 'furniture', 'appliance'], icon: HomeIcon },
  { keywords: ['fashion', 'clothing', 'apparel', 'wear'], icon: ShirtIcon },
  { keywords: ['book', 'media', 'stationery'], icon: BookIcon },
  { keywords: ['beauty', 'health', 'cosmetic', 'personal'], icon: SparkleIcon },
  { keywords: ['sport', 'fitness', 'outdoor'], icon: DumbbellIcon },
  { keywords: ['toy', 'kid', 'game'], icon: ToyIcon }
];

export function getCategoryIcon(name = '') {
  const lower = name.toLowerCase();
  const match = RULES.find((rule) => rule.keywords.some((keyword) => lower.includes(keyword)));
  return match ? match.icon : TagIcon;
}
