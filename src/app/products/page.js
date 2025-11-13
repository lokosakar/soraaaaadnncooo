'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button, Select, Input, Pagination, Modal, Skeleton } from 'antd';
import { ShoppingOutlined, AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
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

  const [loading, setLoading] = useState(true);

  // Quick View
  const [quickItem, setQuickItem] = useState(null);
  const [openQuick, setOpenQuick] = useState(false);

  const pageSize = 12;

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // FILTER, SEARCH, SORT
  const filtered = productsData
    .filter((p) => !category || category === 'All' ? true : p.category === category)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      if (sort === 'az') return a.name.localeCompare(b.name);
      return 0;
    });

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // GSAP Animation
  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [loading, paginated]);

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
          marginBottom: '50px',
          fontSize: '42px',
          letterSpacing: '2px',
        }}
      >
        Our Premium Collection
      </h1>

      {/* FILTER BAR */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto 40px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {/* SEARCH */}
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="large"
          style={{
            backgroundColor: '#141414',
            border: '1px solid #d4af37',
            color: '#d4af37',
            height: '48px',
            flex: 1,
            minWidth: '200px',
          }}
        />

        {/* CATEGORY */}
        <Select
          value={category}
          onChange={(v) => setCategory(v)}
          size="large"
          style={{
            width: 200,
            backgroundColor: '#141414',
            border: '1px solid #d4af37',
            color: '#d4af37',
          }}
          dropdownStyle={{
            backgroundColor: '#141414',
            border: '1px solid #d4af37',
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

        {/* SORT */}
        <Select
          value={sort}
          onChange={(v) => setSort(v)}
          size="large"
          style={{
            width: 200,
            backgroundColor: '#141414',
            border: '1px solid #d4af37',
            color: '#d4af37',
          }}
          dropdownStyle={{
            backgroundColor: '#141414',
            border: '1px solid #d4af37',
          }}
          options={[
            { value: 'default', label: 'Default' },
            { value: 'low', label: 'Harga Termurah' },
            { value: 'high', label: 'Harga Termahal' },
            { value: 'az', label: 'A - Z' },
          ]}
        />

        {/* GRID SWITCHER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '10px' }}>
          <Button
            onClick={() => setGrid(2)}
            icon={<BarsOutlined />}
            style={{
              borderColor: grid === 2 ? '#d4af37' : '#333',
              color: grid === 2 ? '#d4af37' : '#999',
            }}
          />
          <Button
            onClick={() => setGrid(3)}
            icon={<AppstoreOutlined />}
            style={{
              borderColor: grid === 3 ? '#d4af37' : '#333',
              color: grid === 3 ? '#d4af37' : '#999',
            }}
          />
          <Button
            onClick={() => setGrid(4)}
            icon={<AppstoreOutlined />}
            style={{
              borderColor: grid === 4 ? '#d4af37' : '#333',
              color: grid === 4 ? '#d4af37' : '#999',
            }}
          />
        </div>
      </div>

      {/* PRODUCT GRID */}
      <Row ref={containerRef} gutter={[24, 24]} justify="center">
        {loading
          ? [...Array(8)].map((_, i) => (
              <Col xs={24} sm={12} md={8} lg={6} key={i}>
                <Card
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '14px',
                    padding: 10,
                  }}
                >
                  <Skeleton.Image
                    style={{
                      width: '100%',
                      height: 260,
                      borderRadius: '14px',
                    }}
                    active
                  />
                  <Skeleton active paragraph={{ rows: 1 }} />
                </Card>
              </Col>
            ))
          : paginated.map((p) => (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={grid === 4 ? 6 : grid === 3 ? 8 : 12}
                key={p.id}
              >
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
                    <img
                      src={p.img}
                      style={{
                        height: '300px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '14px',
                        borderTopRightRadius: '14px',
                      }}
                      onClick={() => {
                        setQuickItem(p);
                        setOpenQuick(true);
                      }}
                    />
                  }
                >
                  <h3 style={{ fontSize: '18px', color: '#d4af37' }}>{p.name}</h3>
                  <p style={{ color: '#aaa', marginBottom: '12px' }}>
                    Rp {p.price.toLocaleString()}
                  </p>
                  <Button
                    icon={<ShoppingOutlined />}
                    onClick={() => addToCart(p)}
                    style={{
                      backgroundColor: '#d4af37',
                      border: 'none',
                      color: '#000',
                      fontWeight: '600',
                    }}
                  >
                    Add to Cart
                  </Button>
                </Card>
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
          itemRender={(pageNum, type) => {
            const baseStyle = {
              backgroundColor: '#0f0f0f',
              border: '1px solid #d4af37',
              color: '#d4af37',
              borderRadius: '8px',
              padding: '5px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: '0.2s',
            };

            if (type === 'page') {
              return (
                <div
                  style={{
                    ...baseStyle,
                    backgroundColor: page === pageNum ? '#d4af37' : '#0f0f0f',
                    color: page === pageNum ? '#000' : '#d4af37',
                    fontWeight: page === pageNum ? 700 : 500,
                  }}
                >
                  {pageNum}
                </div>
              );
            }

            if (type === 'prev') return <div style={baseStyle}>←</div>;
            if (type === 'next') return <div style={baseStyle}>→</div>;

            return null;
          }}
        />
      </div>

      {/* QUICK VIEW MODAL */}
      <Modal
        open={openQuick}
        onCancel={() => setOpenQuick(false)}
        footer={null}
        centered
        width={600}
        style={{ backgroundColor: '#0f0f0f' }}
      >
        {quickItem && (
          <div style={{ textAlign: 'center', color: '#d4af37' }}>
            <img
              src={quickItem.img}
              style={{
                width: '100%',
                height: 350,
                objectFit: 'cover',
                borderRadius: '14px',
                marginBottom: 20,
              }}
            />
            <h2>{quickItem.name}</h2>
            <p style={{ fontSize: 18, marginBottom: 10 }}>Rp {quickItem.price.toLocaleString()}</p>

            <Button
              icon={<ShoppingOutlined />}
              onClick={() => addToCart(quickItem)}
              style={{
                backgroundColor: '#d4af37',
                color: '#000',
                fontWeight: 600,
                borderRadius: 10,
                padding: '0 30px',
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
