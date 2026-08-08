# ECommerceApi Frontend

A React single-page application consuming the [ECommerceApi backend](https://github.com/nimzrajaguru/ECommerceApi), built for 7SENG014W Web Application Development Coursework 02.

## Live Deployment

- **App**: https://wondrous-salamander-b5733b.netlify.app
- **Backend API**: https://ecommerceapi-12525.azurewebsites.net

## Tech Stack

- React 19 + Vite
- React Router (client-side routing / SPA navigation)
- React Context API (global auth state management)
- Axios (HTTP client, with JWT auto-attached via interceptor)
- Bootstrap 5 (responsive design, UI components)
- Vitest + React Testing Library (unit testing)
- jwt-decode (reading role claims from the JWT for role-based UI)
- Deployed on Netlify, connected to GitHub for automatic deployment on push

## Architecture
src/
├── components/ — reusable UI pieces (ProductCard, Logo, Footer, ProtectedRoute, AdminRoute, ...)
├── pages/ — full views mapped to routes (HomePage, ProductsPage, LoginPage, AdminProductsPage, ...)
├── services/ — API call functions, one file per backend resource (authService, productService, ...)
├── context/ — global state (AuthContext: token, user, role, login/logout)
└── App.jsx — route definitions and top-level layout

## Getting Started (Local)

### Prerequisites
- Node.js (v18+) and npm

### Setup

```bash
git clone https://github.com/nimzrajaguru/ECommerceApi-Frontend.git
cd ECommerceApi-Frontend
npm install
```

Create a `.env` file in the project root:
VITE_API_BASE_URL=https://ecommerceapi-12525.azurewebsites.net/api
(Or point it at `http://localhost:5147/api` to use a locally-running backend instead.)

Run the dev server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Test accounts
Use the seeded Admin account to access Admin functionalities (Manage Products):
- Email: `admin@ecommerce.com`
- Password: `Admin@12345`

Or register a new account for a standard Customer role.

## Running Tests

```bash
npm test -- --run
```

## Building for Production

```bash
npm run build
```

Outputs static, optimized files to `dist/`.

## Key Features

- JWT authentication (register, login, logout) with role based UI- Protected routes (require login) and Admin only routes (require Admin role)
- Responsive Bootstrap grid for product browsing, loading skeletons, stock status indicators
- Ordering and order history, linked to the real transactional order logic of the backend
- Full Admin product management (Create, Read, Update, Delete) – not just read-only browsing
-Global auth state with Context API, no prop drilling
- Responsive design, mobile friendly with collapsable navbar

