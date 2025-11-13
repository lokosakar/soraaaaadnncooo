'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef(null);
  const { items } = useCart(); // ambil jumlah cart

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const linkStyle = (path) => ({
    color: pathname === path ? '#d4af37' : '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    letterSpacing: '1px',
    transition: 'color 0.3s ease',
  });

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 60px',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <h2
          style={{
            color: '#d4af37',
            fontSize: '22px',
            fontWeight: '700',
            letterSpacing: '2px',
          }}
        >
          SORA & CO.
        </h2>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Link href="/" style={linkStyle('/')}>Home</Link>
        <Link href="/about" style={linkStyle('/about')}>About</Link>
        <Link href="/products" style={linkStyle('/products')}>Products</Link>
        <Link href="/contact" style={linkStyle('/contact')}>Contact</Link>

        {/* CART ICON */}
        <Link href="/cart">
          <Badge
            count={items.length}
            offset={[0, 0]}
            style={{
              backgroundColor: '#d4af37',
              color: '#000',
              fontWeight: '600',
            }}
          >
            <ShoppingCartOutlined
              id="cart-icon"
              style={{
                fontSize: '24px',
                color: pathname === '/cart' ? '#d4af37' : '#fff',
                cursor: 'pointer',
                transition: '0.3s',
              }}
            />
          </Badge>
        </Link>
      </div>
    </nav>
  );
}
