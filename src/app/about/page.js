'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef(null);
  const bannerRef = useRef(null);
  const highlightRef = useRef(null);
  const timelineRef = useRef(null);
  const valuesRef = useRef(null);
  const processRef = useRef(null);

  // ============================
  // INIT ANIMATIONS
  // ============================
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Fade-in entire page on entry
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 1.1,
          ease: 'power3.out'
        }
      );

      // Parallax Banner
      if (bannerRef.current) {
        gsap.to(bannerRef.current, {
          scale: 1.04,
          y: -90,
          ease: 'none',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // Highlight block fade
      if (highlightRef.current) {
        gsap.fromTo(
          highlightRef.current,
          { opacity: 0, scale: 0.97 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: highlightRef.current,
              start: 'top 85%'
            }
          }
        );
      }

      // Values fade-in
      if (valuesRef.current) {
        gsap.from(valuesRef.current.children, {
          opacity: 0,
          y: 35,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 85%'
          }
        });
      }

      // Process fade-in
      if (processRef.current) {
        gsap.from(processRef.current.children, {
          opacity: 0,
          x: 35,
          duration: 1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 85%'
          }
        });
      }

      // Timeline items
      if (timelineRef.current) {
        gsap.from(timelineRef.current.children, {
          opacity: 0,
          x: -40,
          duration: 1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 85%'
          }
        });
      }
    });

    // ✨ SUPER IMPORTANT FIX
    // Next.js kadang render ulang → ScrollTrigger perlu refresh
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => ctx.revert();
  }, []);

  // =============================================================
  // UI COMPONENT
  // =============================================================

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: '#0f0f0f',
        color: '#fff',
        padding: '100px 28px',
        minHeight: '100vh',
        fontFamily:
          "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
      }}
    >

      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1
          style={{
            fontSize: '52px',
            color: '#d4af37',
            letterSpacing: 3,
            marginBottom: 10,
            fontFamily: "'Cinzel', serif"
          }}
        >
          About SORA & CO.
        </h1>
        <p style={{ color: '#e6e6e6', opacity: 0.9 }}>
          Rumah kreatif fashion Indonesia — elegan & minimalis.
        </p>
      </div>

      {/* BANNER */}
      <div style={{ textAlign: 'center' }}>
        <div
          ref={bannerRef}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            borderRadius: 18,
            border: '1px solid rgba(212,175,55,0.3)',
            boxShadow: '0 10px 60px rgba(0,0,0,0.6)',
            width: '100%',
            maxWidth: 1100
          }}
        >
          <img
            src="Soraandco.png"
            style={{
              width: '100%',
              height: 520,
              objectFit: 'cover',
              filter: 'brightness(0.9)'
            }}
          />
        </div>
      </div>

      {/* FILOSOFI */}
      <div
        ref={highlightRef}
        style={{
          marginTop: 70,
          background: '#141414',
          padding: '48px 36px',
          borderRadius: 14,
          border: '1px solid rgba(212,175,55,0.28)',
          textAlign: 'center'
        }}
      >
        <h2 style={{ fontSize: 30, color: '#d4af37' }}>Filosofi Kami</h2>
        <p
          style={{
            maxWidth: 850,
            margin: '0 auto',
            color: '#e6e6e6',
            lineHeight: 1.8
          }}
        >
          Fashion bukan sekadar pakaian—ini identitas, ekspresi, dan cerita.
          Setiap desain SORA & CO dibuat dengan detail dan karakter.
        </p>
      </div>

      {/* VALUES */}
      <div ref={valuesRef} style={{ marginTop: 90, textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, color: '#d4af37', marginBottom: 28 }}>
          Nilai Inti SORA & CO.
        </h2>

        <div
          style={{
            display: 'flex',
            gap: 25,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {[
            ['Integrity', 'Kejujuran & transparansi.'],
            ['Inclusivity', 'Untuk semua kalangan.'],
            ['Innovation', 'Selalu bergerak maju.'],
            ['Quality', 'Material & produksi premium.'],
            ['Sustainability', 'Ramah lingkungan.']
          ].map(([title, desc], i) => (
            <div
              key={i}
              style={{
                width: 260,
                padding: 22,
                background: '#151515',
                borderRadius: 12,
                border: '1px solid rgba(212,175,55,0.2)'
              }}
            >
              <h3 style={{ color: '#d4af37' }}>{title}</h3>
              <p style={{ opacity: 0.9 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESS */}
      <div
        ref={processRef}
        style={{
          marginTop: 110,
          maxWidth: 900,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#d4af37',
            marginBottom: 28
          }}
        >
          Craftsmanship Kami
        </h2>

        {[
          ['Perancangan', 'Dimulai dari riset dan sketsa detail.'],
          ['Pemilihan Material', 'Material premium, nyaman & awet.'],
          ['Detailing', 'Teknik presisi & finishing rapi.'],
          ['Quality Control', 'Dicek satu per satu secara ketat.']
        ].map(([title, desc], i) => (
          <div
            key={i}
            style={{
              background: '#141414',
              padding: 22,
              borderLeft: '3px solid #d4af37',
              borderRadius: 12,
              marginBottom: 25
            }}
          >
            <h3 style={{ color: '#d4af37' }}>{title}</h3>
            <p style={{ opacity: 0.9 }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* TIMELINE */}
      <div
        ref={timelineRef}
        style={{
          marginTop: 110,
          maxWidth: 900,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#d4af37',
            marginBottom: 28
          }}
        >
          Perjalanan Kami
        </h2>

        {[
          ['2025', 'Awal berdiri — visi fashion otentik & elegan.'],
          ['2026', 'Ekspansi kategori besar.'],
          ['2027', 'Kolaborasi internasional.'],
          ['2028', 'Rencana flagship showroom.']
        ].map(([year, desc], i) => (
          <div
            key={i}
            style={{
              background: '#151515',
              marginBottom: 22,
              padding: 22,
              borderLeft: '3px solid #d4af37',
              borderRadius: 12
            }}
          >
            <h3 style={{ color: '#d4af37' }}>{year}</h3>
            <p style={{ opacity: 0.9 }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', marginTop: 70 }}>
        <p style={{ opacity: 0.9, color: '#bfa84a' }}>© 2025 PT. SORA & CO.</p>
      </div>
    </div>
  );
}
