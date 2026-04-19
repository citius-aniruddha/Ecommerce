# ShopLite – React Ecommerce UI

A clean, responsive ecommerce UI built with React 18.

## Project Structure

```
shoplite/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          ← Top nav with search + cart button
│   │   ├── CategoryFilter.jsx  ← Filter pill buttons
│   │   ├── ProductCard.jsx     ← Single product card
│   │   ├── ProductGrid.jsx     ← Responsive product grid
│   │   └── CartSidebar.jsx     ← Cart drawer with qty + checkout
│   ├── data/
│   │   └── products.js         ← Product data array
│   ├── App.jsx                 ← Main app with state management
│   ├── index.js                ← React entry point
│   └── index.css               ← Global styles + CSS variables
└── package.json
```

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open in browser
# http://localhost:3000
```

## Features
- Search bar filters products in real time
- Category filter pills (All, Electronics, Clothing, etc.)
- Product cards with star ratings, hover effects, "Added!" feedback
- Cart sidebar with qty controls, subtotal, free shipping threshold
- Responsive grid using CSS auto-fill

## Customising Products
Edit `src/data/products.js` to add/remove products:

```js
{ id: 13, name: "My Product", price: 29.99, category: "Electronics",
  emoji: "📱", bg: "#E6F1FB", tc: "#0C447C", rating: 4.5, reviews: 100 }
```

## Connecting a Backend
Replace the `alert()` in `CartSidebar.jsx` checkout button with a real API call:

```js
await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ items: cart, total }),
});
```
