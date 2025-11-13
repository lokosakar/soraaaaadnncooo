'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCartButton from './components/FloatingCartButton';
import { CartProvider } from './context/CartContext';

export default function ClientLayout({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1a1a1a',
          fontFamily: 'Arial, sans-serif',
        },
      }}
    >
      <CartProvider>
        <Navbar />
        <main style={{ minHeight: '80vh', backgroundColor: '#fff' }}>{children}</main>
        <Footer />
        <FloatingCartButton />
      </CartProvider>
    </ConfigProvider>
  );
}
