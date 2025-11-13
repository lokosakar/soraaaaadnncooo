'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AboutPage() {
  const containerRef = useRef(null);
  const highlightRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const sections = containerRef.current.children;

    gsap.fromTo(
      sections,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.25, duration: 1.2, ease: 'power3.out' }
    );

    gsap.fromTo(
      highlightRef.current,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: highlightRef.current,
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      timelineRef.current.children,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: '#0f0f0f',
        color: '#fff',
        padding: '120px 40px',
        minHeight: '100vh',
        fontFamily: 'Poppins, serif',
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          fontSize: '54px',
          color: '#d4af37',
          textAlign: 'center',
          letterSpacing: '3px',
          marginBottom: '20px',
          textShadow: '0 0 20px rgba(212,175,55,0.25)',
        }}
      >
        About SORA & CO.
      </h1>

      {/* SUBHEAD */}
      <p
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          textAlign: 'center',
          fontSize: '18px',
          lineHeight: 1.75,
          opacity: 0.9,
        }}
      >
        SORA & CO. hadir sebagai rumah kreatif fashion Indonesia.
        Kami merayakan ekspresi diri melalui desain yang elegan, modern,
        dan bermakna.
      </p>

      {/* IMAGE BANNER */}
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(212,175,55,0.3)',
            boxShadow: '0 0 40px rgba(212,175,55,0.15)',
            transition: '0.3s',
          }}
        >
          <img
            src="/banner.jpg"
            alt="SORA & CO Journey"
            style={{
              width: '100%',
              maxWidth: '1000px',
              height: 'auto',
              objectFit: 'cover',
              display: 'block',
              opacity: 0.95,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.5))',
            }}
          />
        </div>
      </div>

      {/* GOLD HIGHLIGHT */}
      <div
        ref={highlightRef}
        style={{
          marginTop: '80px',
          padding: '50px 30px',
          backgroundColor: '#141414',
          borderRadius: '16px',
          border: '1px solid rgba(212,175,55,0.25)',
          textAlign: 'center',
          boxShadow: '0 0 40px rgba(212,175,55,0.12)',
        }}
      >
        <h2
          style={{
            fontSize: '34px',
            color: '#d4af37',
            marginBottom: '15px',
            letterSpacing: '2px',
          }}
        >
          Filosofi Kami
        </h2>
        <p
          style={{
            maxWidth: '750px',
            margin: '0 auto',
            lineHeight: 1.8,
            opacity: 0.95,
          }}
        >
          Fashion bukan sekadar pakaian — ia adalah identitas, perjalanan,
          dan bahasa tanpa kata. Kami menghadirkan koleksi yang memadukan
          seni, warisan budaya, dan sentuhan modern, sehingga setiap orang
          dapat tampil dengan percaya diri.
        </p>
      </div>

      {/* TIMELINE SECTION */}
      <div
        ref={timelineRef}
        style={{
          maxWidth: '900px',
          margin: '100px auto 0',
        }}
      >
        <h2
          style={{
            color: '#d4af37',
            textAlign: 'center',
            fontSize: '34px',
            marginBottom: '40px',
            letterSpacing: '1px',
          }}
        >
          Perjalanan Kami
        </h2>

        {/* ITEM 1 */}
        <div
          style={{
            marginBottom: '30px',
            padding: '20px 25px',
            borderLeft: '3px solid #d4af37',
            backgroundColor: '#151515',
            borderRadius: '10px',
          }}
        >
          <h3 style={{ color: '#d4af37', marginBottom: '8px' }}>2025 – Awal Berdiri</h3>
          <p style={{ opacity: 0.8 }}>
            SORA & CO. lahir dengan visi menghadirkan label fashion lokal
            yang menawarkan kualitas premium dengan harga yang terjangkau.
          </p>
        </div>

        {/* ITEM 2 */}
        <div
          style={{
            marginBottom: '30px',
            padding: '20px 25px',
            borderLeft: '3px solid #d4af37',
            backgroundColor: '#151515',
            borderRadius: '10px',
          }}
        >
          <h3 style={{ color: '#d4af37', marginBottom: '8px' }}>2026 – Ekspansi Koleksi</h3>
          <p style={{ opacity: 0.8 }}>
            Menghadirkan kategori baru: outerwear premium, footwear elegan,
            hingga aksesori modern.
          </p>
        </div>

        {/* ITEM 3 */}
        <div
          style={{
            marginBottom: '30px',
            padding: '20px 25px',
            borderLeft: '3px solid #d4af37',
            backgroundColor: '#151515',
            borderRadius: '10px',
          }}
        >
          <h3 style={{ color: '#d4af37', marginBottom: '8px' }}>2027 – Go International</h3>
          <p style={{ opacity: 0.8 }}>
            SORA & CO. mulai dikenal pasar global melalui kolaborasi dengan
            influencer mode internasional.
          </p>
        </div>
      </div>
    </div>
  );
}
