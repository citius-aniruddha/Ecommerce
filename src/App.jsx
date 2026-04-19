// src/App.jsx
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import products from './data/products';
import UpdateBanner from './components/UpdateBanner';

function App() {
  const [cart, setCart]           = useState([]);
  const [cartOpen, setCartOpen]   = useState(false);
  const [search, setSearch]       = useState('');
  const [activeCat, setActiveCat] = useState('All');

  /* ── Filtered products ── */
  const filtered = useMemo(() =>
    products.filter(p =>
      (activeCat === 'All' || p.category === activeCat) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    ),
  [search, activeCat]);

  /* ── Cart helpers ── */
  const addToCart = product => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = id => setCart(prev => prev.filter(i => i.id !== id));

  const changeQty = (id, delta) =>
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>

      {/* ── Navbar ── */}
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        search={search}
        setSearch={setSearch}
      />

      {/* ── Hero banner ── */}
      <div style={{
        background: 'linear-gradient(135deg, #E6F1FB 0%, #f0f7ff 100%)',
        padding: '28px 24px',
        borderBottom: '1px solid #ddeeff',
      }}>
        <p style={{ fontSize: 12, color: '#378ADD', fontWeight: 600, letterSpacing: '0.5px', marginBottom: 4 }}>
          WELCOME TO
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>
          ShopLite Store
        </h1>
        <p style={{ fontSize: 13, color: '#555' }}>
          {products.length} products · Free shipping on orders over $100
        </p>
      </div>

      {/* ── Category filter ── */}
      <CategoryFilter active={activeCat} setActive={setActiveCat} />

      {/* ── Results count ── */}
      <div style={{ padding: '6px 24px', fontSize: 12, color: '#888' }}>
        Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        {activeCat !== 'All' ? ` in ${activeCat}` : ''}
        {search ? ` for "${search}"` : ''}
      </div>

      {/* ── Product grid ── */}
      <ProductGrid products={filtered} onAdd={addToCart} />

      {/* ── Cart sidebar ── */}
      {cartOpen && (
        <CartSidebar
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onQty={changeQty}
        />
      )}
      <UpdateBanner />
    </div>
  );
}

export default App;
