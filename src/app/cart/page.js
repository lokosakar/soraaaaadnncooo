'use client';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Button, Card, InputNumber, Modal, Radio, message, Spin } from 'antd';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';
import { LoadingOutlined } from '@ant-design/icons';

export default function CartPage() {
  const { items, addToCart, removeFromCart, clearCart, totalPrice } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payment, setPayment] = useState('Bank Transfer');
  const [loading, setLoading] = useState(false);
  const cartRef = useRef(null);
  const totalRef = useRef(null);


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (cartRef.current) {
        gsap.fromTo(
          cartRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );
      }

      if (totalRef.current) {
        gsap.fromTo(
          totalRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power2.out' }
        );
      }
    });
    return () => ctx.revert();
  }, [items]);

  
  const handleCheckout = () => {
    setLoading(true);

    
    const shimmer = gsap.timeline();
    shimmer.to('.payment-overlay', {
      backgroundPosition: '200% center',
      duration: 2,
      ease: 'linear',
      repeat: -1,
    });

    setTimeout(() => {
      setLoading(false);
      shimmer.kill();
      message.success({
        content: `Pembayaran via ${payment} berhasil! ✨`,
        style: {
          backgroundColor: '#d4af37',
          color: '#000',
          borderRadius: '12px',
          border: 'none',
          fontWeight: 600,
        },
        duration: 2.5,
      });
      clearCart();
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
        color: '#d4af37',
        padding: '100px 20px',
        fontFamily: 'Cinzel, serif',
        backgroundImage: 'url("/your-mahakarya-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor:  '#0A0A0A',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: '#d4af37',
          fontSize: '2.8rem',
          fontWeight: '700',
          letterSpacing: '3px',
          marginBottom: '60px',
          textShadow: '0 0 10px rgba(212,175,55,0.4)',
        }}
      >
        Karya Keranjangmu
      </h1>

      {items.length === 0 ? (
        <h3
          style={{
            textAlign: 'center',
            marginTop: '100px',
            opacity: 0.8,
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Belum ada karya di keranjangmu — ciptakan <span style={{ color: '#d4af37' }}></span> 
        </h3>
      ) : (
        <div
          ref={cartRef}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              style={{
                backgroundColor: '#141414',
                border: '1px solid #d4af37',
                borderRadius: '16px',
                boxShadow: '0 0 15px rgba(212,175,55,0.15)',
                color: '#d4af37',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <img
                  src={item.image || item.img}
                  alt={item.name}
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    border: '2px solid #d4af37',
                  }}
                />

                <div style={{ flex: 1, marginLeft: '20px' }}>
                  <h3 style={{ marginBottom: '5px', color: '#d4af37' }}>{item.name}</h3>
                  <p style={{ color: '#d4af37', marginBottom: '5px' }}>
                    Rp {item.price.toLocaleString()}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    size="small"
                    danger
                    style={{
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      background: 'transparent',
                      borderColor: '#d4af37',
                      color: '#d4af37',
                    }}
                  >
                    −
                  </Button>
                  <InputNumber
                    readOnly
                    value={item.qty}
                    min={1}
                    style={{
                      width: '50px',
                      textAlign: 'center',
                      borderColor: '#d4af37',
                      backgroundColor: '#0f0f0f',
                      color: '#d4af37',
                      borderRadius: '8px',
                    }}
                  />
                  <Button
                    onClick={() => addToCart(item)}
                    size="small"
                    style={{
                      backgroundColor: '#d4af37',
                      color: '#000',
                      fontWeight: 600,
                      borderRadius: '8px',
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          <div
            ref={totalRef}
            style={{
              textAlign: 'right',
              marginTop: '40px',
              paddingTop: '30px',
              borderTop: '1px solid #d4af37',
            }}
          >
            <h3 style={{ color: '#d4af37', fontSize: '1.3rem' }}>
              Total: Rp {totalPrice.toLocaleString()}
            </h3>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Button
                onClick={clearCart}
                danger
                style={{
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  borderColor: '#d4af37',
                  color: '#d4af37',
                  background: 'transparent',
                }}
              >
                Hapus Semua
              </Button>
              <Button
                type="primary"
                onClick={() => setIsModalOpen(true)}
                style={{
                  backgroundColor: '#d4af37',
                  color: '#000',
                  fontWeight: '600',
                  borderRadius: '10px',
                  padding: '0 25px',
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}

   
      <Modal
        title={<span style={{ color: '#d4af37', fontWeight: 700 }}>Pilih Metode Pembayaran</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setIsModalOpen(false)}
            style={{
              borderColor: '#d4af37',
              color: '#d4af37',
              background: 'transparent',
              fontWeight: 600,
            }}
          >
            Batal
          </Button>,
          <Button
            key="pay"
            type="primary"
            onClick={handleCheckout}
            style={{
              backgroundColor: '#d4af37',
              color: '#000',
              fontWeight: 700,
              borderRadius: '10px',
            }}
          >
            Bayar Sekarang
          </Button>,
        ]}
        bodyStyle={{
          backgroundColor: '#0f0f0f',
          color: '#d4af37',
          borderRadius: '12px',
          padding: '30px',
        }}
      >
        {loading ? (
          <div
            className="payment-overlay"
            style={{
              textAlign: 'center',
              color: '#d4af37',
              fontWeight: '600',
              padding: '40px 0',
              background: 'linear-gradient(120deg, #d4af37 25%, #0f0f0f 50%, #d4af37 75%)',
              backgroundSize: '200% auto',
              borderRadius: '10px',
            }}
          >
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 30, color: '#d4af37' }} spin />}
            />
            <p style={{ marginTop: '20px', fontSize: '1.1rem', color: '#000000' }}>
              Memproses Pembayaranmu...
            </p>
          </div>
        ) : (
          <Radio.Group
            onChange={(e) => setPayment(e.target.value)}
            value={payment}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              color: '#d4af37',
            }}
          >
            <Radio value="Bank Transfer" style={{ color: '#d4af37' }}>Bank Transfer</Radio>
            <Radio value="Credit Card" style={{ color: '#d4af37' }}>Credit Card</Radio>
            <Radio value="E-Wallet" style={{ color: '#d4af37' }}>E-Wallet</Radio>
          </Radio.Group>
        )}
      </Modal>
    </div>
  );
}
