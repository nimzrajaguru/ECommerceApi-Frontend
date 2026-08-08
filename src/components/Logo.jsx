function Logo() {
  return (
    <svg
      className="brand-logo"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="10" fill="white" fillOpacity="0.15" />
      <path
        d="M10 14h20l-2 14a2 2 0 0 1-2 1.7H14a2 2 0 0 1-2-1.7L10 14z"
        fill="white"
      />
      <path
        d="M14 14v-2a6 6 0 0 1 12 0v2"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="20" cy="21" r="2.5" fill="#4f46e5" />
    </svg>
  )
}

export default Logo
