// src/components/CartSidebar.jsx
import React from 'react';

function CartItem({ item, onRemove, onQty }) {
  return (
    <div style={{
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #f5f5f5',
    }}>
      {/* Icon */}
      <div style={{
        fontSize: 26,
        background: item.bg,
        borderRadius: 10,
        width: 44,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {item.emoji}
      </div>

      {/* Name + price */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 13, fontWeight: 600,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {item.name}
        </p>
        <p style={{ fontSize: 12, color: '#378ADD', fontWeight: 600, marginTop: 2 }}>
          ${(item.price * item.qty).toFixed(2)}
        </p>
      </div>

      {/* Qty controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        background: '#f5f6fa',
        borderRadius: 8,
        padding: '2px 4px',
      }}>
        <button
          onClick={() => onQty(item.id, -1)}
          style={{
            width: 24, height: 24, border: 'none',
            background: 'transparent', cursor: 'pointer',
            fontSize: 14, fontWeight: 600, color: '#378ADD',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 4,
          }}
        >−</button>
        <span style={{ fontSize: 13, fontWeight: 600, minWidth: 18, textAlign: 'center' }}>
          {item.qty}
        </span>
        <button
          onClick={() => onQty(item.id, 1)}
          style={{
            width: 24, height: 24, border: 'none',
            background: 'transparent', cursor: 'pointer',
            fontSize: 14, fontWeight: 600, color: '#378ADD',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 4,
          }}
        >+</button>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.id)}
        style={{
          width: 26, height: 26, border: '1px solid #fecdd3',
          background: '#fff5f5', borderRadius: 6,
          cursor: 'pointer', fontSize: 11, color: '#E24B4A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >✕</button>
    </div>
  );
}

function CartSidebar({ cart, onClose, onRemove, onQty }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 4.99) : 0;
  const total = subtotal + shipping;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
        width: 320,
        background: '#fff',
        borderLeft: '1px solid #e8e8e8',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.08)',
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e8e8e8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Your Cart</h2>
            <p style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
              {cart.reduce((s, i) => s + i.qty, 0)} items
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32,
              border: '1px solid #e8e8e8', borderRadius: 8,
              background: '#fff', cursor: 'pointer',
              fontSize: 14, color: '#888',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#aaa' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🛒</div>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#555' }}>Cart is empty</p>
              <p style={{ fontSize: 12, marginTop: 4 }}>Add some products to get started.</p>
            </div>
          ) : (
            cart.map(item => (
              <CartItem key={item.id} item={item} onRemove={onRemove} onQty={onQty} />
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid #e8e8e8' }}>
            {/* Subtotal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13, color: '#555' }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {/* Shipping */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 13, color: '#555' }}>
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? '#22c55e' : '#555' }}>
                {shipping === 0 ? 'Free 🎉' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            {subtotal < 100 && (
              <p style={{
                fontSize: 11, color: '#888', background: '#f9f9f9',
                padding: '6px 10px', borderRadius: 6, marginBottom: 10,
              }}>
                Add ${(100 - subtotal).toFixed(2)} more for free shipping!
              </p>
            )}
            {/* Total */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: 14, paddingTop: 10,
              borderTop: '1px solid #e8e8e8',
              fontSize: 15, fontWeight: 700,
            }}>
              <span>Total</span>
              <span style={{ color: '#378ADD' }}>${total.toFixed(2)}</span>
            </div>
            {/* Checkout btn */}
            <button
              style={{
                width: '100%',
                padding: '12px',
                background: '#378ADD',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#185FA5'}
              onMouseLeave={e => e.currentTarget.style.background = '#378ADD'}
              onClick={() => alert(`Order placed! Total: $${total.toFixed(2)}`)}
            >
              Checkout — ${total.toFixed(2)}
            </button>
            <p style={{ fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 8 }}>
              Secure checkout · Free returns
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
