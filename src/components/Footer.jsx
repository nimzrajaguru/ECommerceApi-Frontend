function Footer() {
  return (
    <footer className="mt-5 py-4 border-top text-center text-muted">
      <div className="container">
        <p className="mb-1">© {new Date().getFullYear()} ECommerceApi. Built for 7SENG014W Coursework.</p>
        <p className="mb-0 small">
          <a href="https://github.com/nimzrajaguru/ECommerceApi" target="_blank" rel="noreferrer" className="text-muted text-decoration-none">
            Backend Repository
          </a>
          {' · '}
          <a href="https://github.com/nimzrajaguru/ECommerceApi-Frontend" target="_blank" rel="noreferrer" className="text-muted text-decoration-none">
            Frontend Repository
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
