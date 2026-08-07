function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', width: '200px' }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        <strong>${product.price}</strong>
      </p>
      <p>Stock: {product.stockQuantity}</p>
      <p>Category: {product.categoryName}</p>
    </div>
  )
}

export default ProductCard
