'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Select,
  Input,
  Pagination,
  Modal,
  message,
  Badge,
  Rate,
  Slider
} from 'antd';

import {
  ShoppingOutlined,
  AppstoreOutlined,
  BarsOutlined,
  EyeOutlined,
  HeartOutlined,
  HeartFilled
} from '@ant-design/icons';

import { gsap } from 'gsap';
import { useCart } from '../context/CartContext';
import productsData from '../utils/productsData';

export default function ProductsPage() {
  const { addToCart } = useCart();
  const containerRef = useRef(null);

  // STATES
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');
  const [grid, setGrid] = useState(3);
  const [page, setPage] = useState(1);

  const [priceRange, setPriceRange] = useState([0, 130000]);

  const [quickItem, setQuickItem] = useState(null);
  const [open, setOpen] = useState(false);

  const [wishlist, setWishlist] = useState([]);

  const pageSize = 12;

  /* ----------------- FILTER ------------------ */
  const filtered = productsData
    .filter((p) => (category === 'All' ? true : p.category === category))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      if (sort === 'az') return a.name.localeCompare(b.name);
      return 0;
    });

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  /* ---------------- GSAP ENTRANCE ANIMATION -------------- */
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.7,
        ease: 'power3.out',
      }
    );
  }, [page, category, sort, priceRange]);

  /* ---------------- ADD TO CART + BOUNCE ANIMATION -------------- */
  const addWithNotify = (item) => {
    addToCart(item);

    // cart animation
    gsap.fromTo(
      "#cart-icon",
      {
        scale: 1,
        rotate: 0
      },
      {
        scale: 1.4,
        rotate: 10,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      }
    );

    message.open({
      type: "success",
      content: `${item.name} berhasil ditambahkan ✨`,
      duration: 1.8,
      style: {
        backgroundColor: '#d4af37',
        borderRadius: '12px',
        fontWeight: 700,
        color: '#000',
        fontSize: '15px',
        border: 'none',
      },
    });
  };

  /* ---------------- WISHLIST ------------------ */
  const toggleWishlist = (item) => {
    if (wishlist.includes(item.id)) {
      setWishlist(wishlist.filter((id) => id !== item.id));
      return;
    }
    setWishlist([...wishlist, item.id]);

    message.success({
      content: `${item.name} ditambahkan ke wishlist ❤️`,
      duration: 1.5
    });
  };

  /* ---------------- QUICK VIEW HANDLER -------------- */
  const openQuickView = (item) => {
    setQuickItem(item);
    setOpen(true);
    setTimeout(() => {
      gsap.fromTo(
        '.quick-modal-content',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    }, 50);
  };
  return (
    <div
      style={{
        backgroundColor: '#0f0f0f',
        color: '#fff',
        minHeight: '100vh',
        padding: '100px 40px',
      }}
    >
      <h1
        style={{
          color: '#d4af37',
          textAlign: 'center',
          marginBottom: '40px',
          fontSize: '42px',
          letterSpacing: '2px',
          fontWeight: 600,
        }}
      >
        Our Premium Collection
      </h1>

      {/* ===== FILTER BAR ===== */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto 40px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {/* Search */}
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          size="large"
          style={{
            backgroundColor: '#141414',
            border: '1px solid #d4af37',
            color: '#d4af37',
            height: '48px',
            flex: 1,
            minWidth: '160px',
          }}
        />

        {/* Category */}
        <Select
          value={category}
          onChange={(v) => {
            setCategory(v);
            setPage(1);
          }}
          size="large"
          style={{
            width: 200,
            backgroundColor: '#d4af37',
            border: '1px solid #d4af37',
            color: '#d4af37',
          }}
          options={[
            { value: 'All', label: 'All' },
            { value: 'Atasan', label: 'Atasan' },
            { value: 'Bawahan', label: 'Bawahan' },
            { value: 'Outerwear', label: 'Outerwear' },
            { value: 'Aksesori', label: 'Aksesori' },
            { value: 'Footwear', label: 'Footwear' },
          ]}
        />

        {/* Sort */}
        <Select
          value={sort}
          onChange={(v) => {
            setSort(v);
            setPage(1);
          }}
          size="large"
          style={{
            width: 200,
            backgroundColor: '#141414',
            border: '1px solid #d4af37',
            color: '#d4af37',
          }}
          options={[
            { value: 'default', label: 'Default' },
            { value: 'low', label: 'Harga Termurah' },
            { value: 'high', label: 'Harga Termahal' },
            { value: 'az', label: 'A - Z' },
          ]}
        />

        {/* Grid Switch */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button
            onClick={() => setGrid(2)}
            icon={<BarsOutlined />}
            style={{
              borderColor: grid === 2 ? '#d4af37' : '#333',
              color: grid === 2 ? '#d4af37' : '#777',
            }}
          />
          <Button
            onClick={() => setGrid(3)}
            icon={<AppstoreOutlined />}
            style={{
              borderColor: grid === 3 ? '#d4af37' : '#333',
              color: grid === 3 ? '#d4af37' : '#777',
            }}
          />
          <Button
            onClick={() => setGrid(4)}
            icon={<AppstoreOutlined />}
            style={{
              borderColor: grid === 4 ? '#d4af37' : '#333',
              color: grid === 4 ? '#d4af37' : '#777',
            }}
          />
        </div>
      </div>

      {/* ===== PRICE RANGE FILTER ===== */}
      <div style={{ maxWidth: "900px", margin: "0 auto 40px" }}>
        <p style={{ color: '#d4af37', fontWeight: 600, marginBottom: 8 }}>
          Filter Harga (Rp {priceRange[0].toLocaleString()} – Rp {priceRange[1].toLocaleString()})
        </p>

        <Slider
          range
          min={0}
          max={130000}
          step={10000}
          value={priceRange}
          onChange={(v) => {
            setPriceRange(v);
            setPage(1);
          }}
        />
      </div>

      {/* ===== PRODUCT LIST ===== */}
      <Row ref={containerRef} gutter={[24, 24]} justify="center">
        {paginated.map((p) => (
          <Col
            key={p.id}
            xs={24}
            sm={12}
            md={8}
            lg={grid === 4 ? 6 : grid === 3 ? 8 : 12}
          >

            <Badge.Ribbon
              text={p.stock === 0 ? "OUT OF STOCK" : p.category}
              color={p.stock === 0 ? "red" : "gold"}
            >
              <Card
                hoverable
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '14px',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                  textAlign: 'center',
                  position: 'relative',
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;

                  const rotateY = ((x / rect.width) - 0.5) * 10;
                  const rotateX = ((y / rect.height) - 0.5) * -10;

                  card.style.transform =
                    `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                  card.style.boxShadow = '0 0 18px rgba(212,175,55,0.45)';
                }}
                onMouseLeave={(e) => {
                  const c = e.currentTarget;
                  c.style.transform = `scale(1)`;
                  c.style.boxShadow = 'none';
                }}
                cover={
                  <div style={{ position: 'relative' }}>
                    {/* Image swap */}
                    <img
                      src={p.img}
                      alt={p.name}
                      style={{
                        height: '300px',
                        width: '100%',
                        objectFit: 'cover',
                        borderTopLeftRadius: '14px',
                        borderTopRightRadius: '14px',
                        transition: '0.25s',
                      }}
                      onMouseEnter={(e) => p.img2 && (e.currentTarget.src = p.img2)}
                      onMouseLeave={(e) => p.img2 && (e.currentTarget.src = p.img)}
                    />

                    {/* LOW STOCK ALERT */}
                    {p.stock > 0 && p.stock <= 5 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          left: 10,
                          background: 'rgba(255,0,0,0.7)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '12px',
                        }}
                      >
                        Only {p.stock} left!
                      </div>
                    )}

                    {/* Wishlist */}
                    <Button
                      shape="circle"
                      onClick={() => toggleWishlist(p)}
                      icon={
                        wishlist.includes(p.id)
                          ? <HeartFilled style={{ color: 'red' }} />
                          : <HeartOutlined style={{ color: '#d4af37' }} />
                      }
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        border: '1px solid #d4af37',
                      }}
                    />

                    {/* Quick View */}
                    <Button
                      icon={<EyeOutlined />}
                      onClick={() => openQuickView(p)}
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: '#d4af37',
                        border: '1px solid #d4af37',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      Quick View
                    </Button>
                  </div>
                }
              >

                <h3 style={{ color: '#d4af37', fontSize: '18px' }}>{p.name}</h3>

                <Rate disabled defaultValue={p.rating || 5} style={{ color: '#d4af37' }} />

                <p style={{ color: '#aaa' }}>Rp {p.price.toLocaleString()}</p>

                {/* Add to Cart Button */}
                <Button
                  icon={<ShoppingOutlined />}
                  disabled={p.stock === 0}
                  onClick={() => addWithNotify(p)}
                  style={{
                    backgroundColor: p.stock === 0 ? '#555' : '#d4af37',
                    border: 'none',
                    color: p.stock === 0 ? '#888' : '#000',
                    fontWeight: '600',
                    width: '100%',
                    height: '42px',
                    marginTop: '6px',
                  }}
                >
                  {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>

      {/* PAGINATION */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={filtered.length}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
        />
      </div>

      {/* QUICK VIEW MODAL */}
      <Modal
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        centered
        bodyStyle={{
          backgroundColor: '#111',
          border: '1px solid #d4af37',
          borderRadius: '16px',
          padding: '0',
        }}
      >
        {quickItem && (
          <div className="quick-modal-content" style={{ padding: '20px' }}>
            <img
              src={quickItem.img}
              alt={quickItem.name}
              style={{ width: '100%', borderRadius: '12px', marginBottom: '20px' }}
            />

            <h2 style={{ color: '#d4af37' }}>{quickItem.name}</h2>

            <Rate disabled defaultValue={quickItem.rating || 5} style={{ color: '#d4af37' }} />

            <p style={{ color: '#ccc', marginBottom: '20px' }}>
              Rp {quickItem.price.toLocaleString()}
            </p>

            <Button
              block
              icon={<ShoppingOutlined />}
              disabled={quickItem.stock === 0}
              onClick={() => addWithNotify(quickItem)}
              style={{
                backgroundColor: '#d4af37',
                border: 'none',
                color: '#000',
                fontWeight: 600,
                height: '45px',
              }}
            >
              Add to Cart
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
