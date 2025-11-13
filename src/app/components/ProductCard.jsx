'use client';

import React, { useState } from 'react';
import { Button, Card, Modal } from 'antd';
import { ShoppingOutlined, EyeOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import { notifySuccess } from './LuxuryToast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* PRODUCT CARD */}
      <Card
        hoverable
        style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '14px',
          color: '#fff',
          textAlign: 'center',
          transition: '0.3s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        cover={
          <div style={{ position: 'relative' }}>
            <img
              src={product.img}
              alt={product.name}
              style={{
                height: '300px',
                width: '100%',
                objectFit: 'cover',
                borderTopLeftRadius: '14px',
                borderTopRightRadius: '14px',
              }}
            />

            {/* QUICK VIEW BUTTON */}
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => setOpen(true)}
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                backgroundColor: '#d4af37',
                border: 'none',
                color: '#000',
              }}
            />
          </div>
        }
      >
        <h3 style={{ fontSize: '18px', color: '#d4af37' }}>{product.name}</h3>
        <p style={{ color: '#aaa', marginBottom: '12px' }}>
          Rp {product.price.toLocaleString()}
        </p>

        <Button
          icon={<ShoppingOutlined />}
          onClick={() => {
            addToCart(product);
            notifySuccess(`${product.name} ditambahkan ke keranjang!`);
          }}
          style={{
            backgroundColor: '#d4af37',
            border: 'none',
            color: '#000',
            fontWeight: '600',
            borderRadius: '8px'
          }}
        >
          Add to Cart
        </Button>
      </Card>

      {/* QUICK VIEW MODAL */}
      <Modal
        title={<span style={{ color: '#d4af37', fontWeight: 700 }}>{product.name}</span>}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        styles={{
          body: { backgroundColor: '#111', color: '#fff', borderRadius: '12px' }
        }}
      >
        <img
          src={product.img}
          alt={product.name}
          style={{
            width: '100%',
            borderRadius: '10px',
            marginBottom: '20px'
          }}
        />
        <p style={{ color: '#d4af37', fontSize: '18px' }}>
          Rp {product.price.toLocaleString()}
        </p>
        <Button
          icon={<ShoppingOutlined />}
          onClick={() => {
            addToCart(product);
            notifySuccess(`${product.name} berhasil ditambahkan!`);
          }}
          style={{
            marginTop: '15px',
            width: '100%',
            backgroundColor: '#d4af37',
            border: 'none',
            color: '#000',
            fontWeight: '700'
          }}
        >
          Add to Cart
        </Button>
      </Modal>
    </>
  );
}
