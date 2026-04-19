// src/components/ProductCard.jsx
import React, { useState } from 'react';

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          style={{
            fontSize: 11,
            color: star <= Math.round(rating) ? '#F59E0B' : '#d1d5db',
          }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: 11, color: '#888', marginLeft: 2 }}>
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: '1px solid',
        borderColor: hovered ? '#378ADD' : '#e8e8e8',
        borderRadius: 14,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? '0 4px 16px rgba(55,138,221,0.12)' : '0 1px 4px rgba(0,0,0,0.06)',
        cursor: 'default',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        background: product.bg,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 52,
        position: 'relative',
        transition: 'height 0.2s',
      }}>
        {product.emoji}
        {/* Wishlist icon */}
        <button
          title="Wishlist"
          style={{
            position: 'absolute', top: 8, right: 8,
            background: '#fff', border: '1px solid #e8e8e8',
            borderRadius: '50%', width: 28, height: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, cursor: 'pointer', color: '#aaa',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
          onClick={e => { e.stopPropagation(); }}
        >♡</button>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {/* Category badge */}
        <span style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
          color: product.tc,
          background: product.bg,
          padding: '2px 8px',
          borderRadius: 20,
          alignSelf: 'flex-start',
        }}>
          {product.category}
        </span>

        {/* Name */}
        <p style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.35, color: '#1a1a1a' }}>
          {product.name}
        </p>

        {/* Stars */}
        <StarRating rating={product.rating} />
        <p style={{ fontSize: 11, color: '#aaa', marginTop: -2 }}>
          {product.reviews} reviews
        </p>

        {/* Price + Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: 10,
          borderTop: '1px solid #f0f0f0',
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#378ADD' }}>
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            style={{
              padding: '6px 14px',
              background: added ? '#22c55e' : '#378ADD',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
              minWidth: 70,
            }}
            onMouseEnter={e => {
              if (!added) e.currentTarget.style.background = '#185FA5';
            }}
            onMouseLeave={e => {
              if (!added) e.currentTarget.style.background = '#378ADD';
            }}
          >
            {added ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
