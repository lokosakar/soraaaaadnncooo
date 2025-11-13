'use client';
import React, { useLayoutEffect, useRef } from 'react';
import { Button, Row, Col, Card } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from './context/CartContext';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { addToCart } = useCart();

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const featuredRef = useRef(null);

  const featuredProducts = [
    { id: 24, name: 'Jaket Kulit Premium', price: 120000, img: '/products/jaket-kulit.jpg' },
    { id: 20, name: 'High Heels Elegance', price: 130000, img: '/products/high-heels.jpg' },
    { id: 31, name: 'Kaos Polo Classic', price: 100000, img: '/products/kaos-polo.jpg' },
    { id: 55, name: 'Sneakers Canvas', price: 130000, img: '/products/sneakers-canvas.jpg' },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-child'),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
          }
        }
      );

     
      gsap.fromTo(
        featuredRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 85%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#fff' }}>
      
     
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          padding: '160px 20px',
          textAlign: 'center',
          backgroundImage: 'url(/banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.6)'
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1
            className="hero-child"
            style={{
              fontSize: '52px',
              fontWeight: '700',
              color: '#d4af37',
              textShadow: '0 0 15px rgba(212,175,55,0.35)',
              letterSpacing: '3px'
            }}
          >
            Fashion is the Way of Expression
          </h1>

          <p
            className="hero-child"
            style={{
              marginTop: '20px',
              fontSize: '18px',
              opacity: 0.9
            }}
          >
            Discover timeless elegance and world-class craftsmanship.
          </p>

          <Button
            className="hero-child"
            type="primary"
            size="large"
            style={{
              marginTop: '35px',
              backgroundColor: '#d4af37',
              color: '#000',
              border: 'none',
              padding: '0 45px',
              fontWeight: '700',
              borderRadius: '8px'
            }}
          >
            Explore Now
          </Button>
        </div>
      </section>

    
      <section
        ref={aboutRef}
        style={{
          padding: '120px 30px',
          textAlign: 'center',
          backgroundColor: '#141414'
        }}
      >
        <h2
          style={{
            fontSize: '38px',
            color: '#d4af37',
            marginBottom: '20px',
            fontWeight: '700'
          }}
        >
          About Us
        </h2>

        <p
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            fontSize: '18px',
            opacity: 0.85,
            lineHeight: '1.7'
          }}
        >
          PT. SORA & CO. is a luxury fashion house that blends modern vision
          with timeless artistry — every detail crafted to elevate the soul.
        </p>
      </section>

     
      <section style={{ padding: '100px 40px', backgroundColor: '#0f0f0f' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '38px',
            color: '#d4af37',
            marginBottom: '60px',
            fontWeight: '700'
          }}
        >
          Featured Collection
        </h2>

        <Row
          gutter={[24, 24]}
          justify="center"
          ref={featuredRef}
        >
          {featuredProducts.map((p) => (
            <Col xs={24} sm={12} md={8} lg={6} key={p.id}>
              <Card
                hoverable
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '14px',
                  textAlign: 'center',
                  color: '#fff',
                  transition: '0.3s'
                }}
                cover={
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      height: '320px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '14px',
                      borderTopRightRadius: '14px'
                    }}
                  />
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.borderColor = '#d4af37';
                  e.currentTarget.style.boxShadow =
                    '0 0 12px rgba(212,175,55,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = '#2a2a2a';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{ fontSize: '20px', marginBottom: '6px' }}>{p.name}</h3>
                <p style={{ marginBottom: '12px', opacity: 0.85 }}>
                  Rp {p.price.toLocaleString()}
                </p>

                <Button
                  icon={<ShoppingOutlined />}
                  type="primary"
                  onClick={() => addToCart(p)}
                  style={{
                    backgroundColor: '#d4af37',
                    color: '#000',
                    border: 'none',
                    fontWeight: '600'
                  }}
                >
                  Add to Cart
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
}
