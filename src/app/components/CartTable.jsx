
'use client';

import React from 'react';
import Link from 'next/link';
import { Table, InputNumber, Button, Popconfirm, message, Empty } from 'antd';
import { useCart } from '../context/CartContext';



export default function CartTable() {
  const { items, updateQty, removeFromCart, total, clearCart } = useCart();


  const fmt = (v) => {
    if (typeof v !== 'number') v = Number(v) || 0;
    return `Rp ${v.toLocaleString('id-ID')}`;
  };

  
  const dataSource = items.map((i) => ({
    key: i.id,
    ...i,
  }));

  const handleQtyChange = (id, val) => {
    
    const qty = Number(val) >= 1 ? Number(val) : 1;
    updateQty(id, qty);
  };

  const onCheckout = () => {
    if (items.length === 0) {
      message.warning('Keranjang kosong.');
      return;
    }
    
    message.success('Checkout berhasil (mock). Terima kasih!');
    clearCart();
  };

  const columns = [
    {
      title: 'Produk',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <img
            src={record.image}
            alt={record.name}
            style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6 }}
          />
          <div>
            <div style={{ fontWeight: 600 }}>{record.name}</div>
            {record.category ? <div style={{ fontSize: 12, color: '#666' }}>{record.category}</div> : null}
          </div>
        </div>
      ),
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (v) => <div>{fmt(v)}</div>,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      align: 'center',
      render: (v, record) => (
        <InputNumber
          min={1}
          value={v}
          onChange={(val) => handleQtyChange(record.id, val)}
          style={{ width: 100 }}
        />
      ),
    },
    {
      title: 'Subtotal',
      key: 'sub',
      align: 'right',
      render: (_, r) => <div>{fmt(r.price * r.qty)}</div>,
    },
    {
      title: 'Aksi',
      key: 'action',
      align: 'center',
      render: (_, r) => (
        <Popconfirm
          title="Hapus item dari keranjang?"
          onConfirm={() => {
            removeFromCart(r.id);
            message.success('Item dihapus');
          }}
          okText="Ya"
          cancelText="Batal"
        >
          <Button danger>Hapus</Button>
        </Popconfirm>
      ),
    },
  ];

  if (items.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <Empty description="Keranjang kosong" />
        <div style={{ marginTop: 16 }}>
          <Link href="/products">
            <Button type="primary">Lihat Produk</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <div>
          <Button danger onClick={() => {
            clearCart();
            message.info('Keranjang dikosongkan');
          }}>
            Kosongkan Keranjang
          </Button>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Total: {fmt(total)}</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Link href="/products">
              <Button>Tambah Lagi</Button>
            </Link>
            <Button type="primary" onClick={onCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
