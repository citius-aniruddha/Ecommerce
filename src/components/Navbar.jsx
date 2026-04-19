// src/components/Navbar.jsx
import React from 'react';

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: '#fff',
    borderBottom: '1px solid #e8e8e8',
    padding: '0 24px',
    height: 58,
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    fontWeight: 700,
    fontSize: 20,
    color: '#378ADD',
    letterSpacing: '-0.5px',
    minWidth: 100,
  },
  searchWrapper: {
    flex: 1,
    maxWidth: 420,
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    padding: '8px 12px 8px 36px',
    border: '1px solid #e8e8e8',
    borderRadius: 8,
    fontSize: 13,
    outline: 'none',
    background: '#f9f9f9',
    color: '#1a1a1a',
    transition: 'border-color 0.15s, background 0.15s',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: 14,
    pointerEvents: 'none',
  },
  actions: {
    marginLeft: 'auto',
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  cartBtn: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '7px 14px',
    background: '#378ADD',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    background: '#E24B4A',
    color: '#fff',
    borderRadius: '50%',
    width: 18,
    height: 18,
    fontSize: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
  },
  wishlistBtn: {
    padding: '7px 12px',
    background: 'transparent',
    border: '1px solid #e8e8e8',
    borderRadius: 8,
    fontSize: 14,
    cursor: 'pointer',
    color: '#888',
    transition: 'border-color 0.15s',
  },
};

function Navbar({ cartCount, onCartClick, search, setSearch }) {
  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <div style={styles.logo}>ShopLite</div>

      {/* Search */}
      <div style={styles.searchWrapper}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={e => {
            e.target.style.borderColor = '#378ADD';
            e.target.style.background = '#fff';
          }}
          onBlur={e => {
            e.target.style.borderColor = '#e8e8e8';
            e.target.style.background = '#f9f9f9';
          }}
        />
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.wishlistBtn} title="Wishlist">♡</button>
        <button
          style={styles.cartBtn}
          onClick={onCartClick}
          onMouseEnter={e => e.currentTarget.style.background = '#185FA5'}
          onMouseLeave={e => e.currentTarget.style.background = '#378ADD'}
        >
          🛒 Cart
          {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
