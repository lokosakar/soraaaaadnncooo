'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        textAlign: 'center',
        backgroundColor: '#0a0a0a',
        padding: '80px 20px 60px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        color: '#b8b8b8',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Divider */}
      <div
        style={{
          height: '2px',
          width: '100px',
          background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
          margin: '0 auto 30px',
        }}
      />

      {/* Main Text */}
      <h3
        style={{
          color: '#fff',
          fontSize: '22px',
          letterSpacing: '1px',
          marginBottom: '8px',
          fontWeight: '600',
        }}
      >
        PT. SORA & CO.
      </h3>
      <p style={{ fontSize: '15px', marginBottom: '6px', opacity: 0.9 }}>
        Fashion for Every Story
      </p>
      <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '35px' }}>
        Crafted with Passion · © 2025
      </p>

      {/* Social Icons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
        <Link
          href="#"
          style={{
            color: '#d4af37',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <Instagram
            size={26}
            style={{
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </Link>

        <Link
          href="#"
          style={{
            color: '#d4af37',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <Facebook
            size={26}
            style={{
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </Link>

        <Link
          href="#"
          style={{
            color: '#d4af37',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <Linkedin
            size={26}
            style={{
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </Link>
      </div>

      {/* Glow background subtle */}
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </footer>
  );
}
