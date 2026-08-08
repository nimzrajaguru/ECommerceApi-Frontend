import { useState, useEffect } from 'react'
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/productService.js'
import { getAllCategories } from '../services/categoryService.js'

const emptyForm = { name: '', description: '', price: '', stockQuantity: '', categoryId: '' }

function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadProducts()
    getAllCategories().then(setCategories)
  }, [])

  function loadProducts() {
    getAllProducts().then(setProducts)
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function startEdit(product) {
    setEditingId(product.id)
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stockQuantity: product.stockQuantity,
      categoryId: product.categoryId,
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptyForm)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stockQuantity: Number(form.stockQuantity),
      categoryId: Number(form.categoryId),
    }

    try {
      if (editingId) {
        await updateProduct(editingId, payload)
        setMessage('Product updated successfully.')
      } else {
        await createProduct(payload)
        setMessage('Product created successfully.')
      }
      cancelEdit()
      loadProducts()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product.')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this product?')) return
    try {
      await deleteProduct(id)
      loadProducts()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product.')
    }
  }

  return (
    <div>
      <h1 className="mb-4">Manage Products</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{editingId ? 'Edit Product' : 'Add New Product'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-2 mb-2">
              <div className="col-md-6">
                <input
                  className="form-control"
                  name="name"
                  placeholder="Product name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-2">
              <input
                className="form-control"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div className="row g-2 mb-3">
              <div className="col-md-6">
                <input
                  className="form-control"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  className="form-control"
                  name="stockQuantity"
                  type="number"
                  placeholder="Stock quantity"
                  value={form.stockQuantity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            {message && <div className="alert alert-success py-2">{message}</div>}
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Save Changes' : 'Create Product'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-outline-secondary ms-2" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.categoryName}</td>
              <td>${product.price}</td>
              <td>{product.stockQuantity}</td>
              <td className="text-end">
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(product)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminProductsPage
