import { useState, useEffect } from 'react'
import { getAllCategories } from '../services/categoryService.js'

function HomePage() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data)
    })
  }, [])

  return (
    <div>
      <h1>Home Page</h1>
      <p>Categories from the backend:</p>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
