// src/components/CategoryFilter.jsx
import React from 'react';
import { CATEGORIES } from '../data/products';

function CategoryFilter({ active, setActive }) {
  return (
    <div style={{
      padding: '14px 24px 8px',
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      alignItems: 'center',
    }}>
      <span style={{ fontSize: 12, color: '#888', marginRight: 4, fontWeight: 500 }}>
        FILTER:
      </span>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          style={{
            padding: '5px 14px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            border: '1px solid',
            transition: 'all 0.15s',
            borderColor: active === cat ? '#378ADD' : '#e8e8e8',
            background:  active === cat ? '#378ADD' : '#fff',
            color:       active === cat ? '#fff'    : '#555',
          }}
          onMouseEnter={e => {
            if (active !== cat) {
              e.currentTarget.style.borderColor = '#378ADD';
              e.currentTarget.style.color = '#378ADD';
            }
          }}
          onMouseLeave={e => {
            if (active !== cat) {
              e.currentTarget.style.borderColor = '#e8e8e8';
              e.currentTarget.style.color = '#555';
            }
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
