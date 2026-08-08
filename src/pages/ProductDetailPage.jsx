import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/productService.js'
import { getReviewsByProduct, createReview, deleteReview } from '../services/reviewService.js'
import { useAuth } from '../context/AuthContext.jsx'
import { createOrder } from '../services/orderService.js'

function ProductDetailPage() {
  const { id } = useParams()
  const { token, userId } = useAuth()

  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [reviewError, setReviewError] = useState('')
  const [orderMessage, setOrderMessage] = useState('')

  useEffect(() => {
    loadData()
  }, [id])

  function loadData() {
    setLoading(true)
    Promise.all([getProductById(id), getReviewsByProduct(id)])
      .then(([productData, reviewsData]) => {
        setProduct(productData)
        setReviews(reviewsData)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load product.')
        setLoading(false)
      })
  }

  async function handleReviewSubmit(e) {
    e.preventDefault()
    setReviewError('')
    try {
      await createReview(Number(id), rating, comment)
      setComment('')
      setRating(5)
      loadData()
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to submit review.')
    }
  }

  async function handleDeleteReview(reviewId) {
    if (!window.confirm('Delete this review?')) return
    await deleteReview(reviewId)
    loadData()
  }

  async function handleOrder() {
    setOrderMessage('')
    try {
      await createOrder([{ productId: Number(id), quantity: 1 }], '123 Test Street')
      setOrderMessage('Order placed successfully!')
    } catch (err) {
      setOrderMessage(err.response?.data?.message || 'Failed to place order.')
    }
  }

  if (loading) return <p>Loading product...</p>
  if (error) return <p className="text-danger">{error}</p>
  if (!product) return null

  return (
    <div>
      <Link to="/products" className="btn btn-outline-secondary btn-sm mb-3">← Back to Products</Link>

      <div className="row">
        <div className="col-md-8">
          <h1>{product.name}</h1>
          <p className="text-muted">{product.description}</p>
          <p className="fs-3 fw-bold">${product.price}</p>
          <p>Stock: {product.stockQuantity} &middot; Category: {product.categoryName}</p>
          <p>Average Rating: {product.averageRating?.toFixed(1) ?? 'No ratings yet'} / 5</p>

          {token && (
            <button
              className="btn btn-primary mb-4"
              onClick={handleOrder}
              disabled={product.stockQuantity === 0}
            >
              {product.stockQuantity === 0 ? 'Out of Stock' : 'Order Now'}
            </button>
          )}
          {orderMessage && <p>{orderMessage}</p>}
        </div>
      </div>

      <hr />

      <h3>Reviews</h3>

      {token && (
        <form onSubmit={handleReviewSubmit} className="mb-4">
          <div className="mb-2">
            <label className="form-label">Rating</label>
            <select className="form-select w-auto" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} star{r !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <textarea
              className="form-control"
              placeholder="Write a review (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          {reviewError && <div className="alert alert-danger py-2">{reviewError}</div>}
          <button type="submit" className="btn btn-primary btn-sm">Submit Review</button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="text-muted">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="border-bottom pb-2 mb-2">
            <strong>{review.userName}</strong> — {review.rating} / 5
            <p className="mb-1">{review.comment}</p>
            {userId === review.userId && (
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteReview(review.id)}>
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default ProductDetailPage
