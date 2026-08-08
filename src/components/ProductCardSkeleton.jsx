function ProductCardSkeleton() {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100" style={{ opacity: 0.6 }}>
        <div className="card-body">
          <div
            className="placeholder-glow"
          >
            <span className="placeholder col-8 mb-2" style={{ height: '20px', display: 'block', borderRadius: '4px' }}></span>
            <span className="placeholder col-12 mb-1" style={{ height: '14px', display: 'block', borderRadius: '4px' }}></span>
            <span className="placeholder col-10 mb-3" style={{ height: '14px', display: 'block', borderRadius: '4px' }}></span>
            <span className="placeholder col-4" style={{ height: '24px', display: 'block', borderRadius: '4px' }}></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton