// src/components/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';

function ProductGrid({ products, onAdd }) {
  if (products.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: '#aaa',
      }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
        <p style={{ fontSize: 15, fontWeight: 500, color: '#555' }}>No products found</p>
        <p style={{ fontSize: 13, marginTop: 4 }}>Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: 16,
      padding: '12px 24px 40px',
    }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default ProductGrid;
