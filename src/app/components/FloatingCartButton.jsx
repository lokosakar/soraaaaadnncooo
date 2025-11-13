'use client';
import React, { useEffect, useState } from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import { Badge } from 'antd';
import { gsap } from 'gsap';

export default function FloatingCartButton() {
  const { items = [] } = useCart() || {}; // ✅ default aman biar gak undefined
  const [count, setCount] = useState(0);

  // ✅ Hitung total quantity aman
  useEffect(() => {
    if (Array.isArray(items)) {
      const totalQty = items.reduce((acc, item) => acc + (item.qty || 1), 0);
      setCount(totalQty);
    } else {
      setCount(0);
    }
  }, [items]);

  // ✅ Animasi badge pas jumlah berubah
  useEffect(() => {
    if (count > 0) {
      gsap.fromTo(
        '.cart-badge',
        { scale: 1.2, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' }
      );
    }
  }, [count]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 1000,
        cursor: 'pointer',
      }}
      onClick={() => (window.location.href = '/cart')}
    >
      <Badge
        count={count}
        offset={[-5, 8]}
        className="cart-badge"
        style={{
          backgroundColor: '#d4af37', // emas
          color: '#000',
          fontWeight: 600,
          boxShadow: '0 0 6px rgba(212,175,55,0.6)',
        }}
      >
        <div
          style={{
            backgroundColor: 'transparent',
            border: '2px solid #d4af37',
            borderRadius: '50%',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = 'scale(1.08)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = 'scale(1)')
          }
        >
          <ShoppingOutlined
            style={{
              fontSize: '26px',
              color: '#d4af37',
            }}
          />
        </div>
      </Badge>
    </div>
  );
}
