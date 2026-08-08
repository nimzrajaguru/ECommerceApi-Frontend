import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllCategories } from '../services/categoryService.js'

function HomePage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load categories.')
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <div
        className="p-5 mb-4 rounded-4 text-white"
        style={{
          background: 'linear-gradient(120deg, #4f46e5 0%, #06b6d4 100%)',
        }}
      >
        <h1 className="fw-bold">Welcome to ECommerceApi</h1>
        <p className="lead mb-4">
          Browse our catalog, place orders, and manage your account — all in one place.
        </p>
        <Link to="/products" className="btn btn-light btn-lg fw-semibold">
          Shop Now
        </Link>
      </div>

      <h2 className="h4 mb-3">Browse by Category</h2>
      {loading && <p className="text-muted">Loading categories...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="d-flex flex-wrap gap-2">
          {categories.length === 0 ? (
            <p className="text-muted">No categories available yet.</p>
          ) : (
            categories.map((category) => (
              <span key={category.id} className="badge rounded-pill text-bg-light border px-3 py-2 fs-6">
                {category.name}
              </span>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default HomePage
