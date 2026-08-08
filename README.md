# Onyx Frontend

React + Vite + Tailwind CSS storefront for the eCommerce API.

## Run locally

```bash
npm install
npm run dev
```

The app expects the backend API at http://localhost:5147/api.

## Structure

```
src/
  api/          axios client + one module per resource (products, categories, reviews, orders, auth)
  components/
    brand/      logo
    layout/     Navbar, Footer, Layout shell
    product/    ProductCard, ProductThumb
    ui/         Spinner, StarRating, StatusBadge, icons
  context/      AuthContext, CartContext
  pages/        one file per route, admin/ holds the admin dashboard + its sections
  routes/       ProtectedRoute
  utils/        jwt parsing, formatting helpers
```
