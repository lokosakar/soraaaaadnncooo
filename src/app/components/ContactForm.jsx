// src/components/ContactForm.jsx
'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (data.success) {
        message.success('Pesan berhasil dikirim!');
      } else {
        message.error('Gagal mengirim pesan.');
      }
    } catch (err) {
      console.error(err);
      message.error('Terjadi kesalahan server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '60px 20px', background: '#fefefe' }}>
      <Card title="Hubungi Kami" style={{ maxWidth: 600, margin: '0 auto' }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Nama" name="name" rules={[{ required: true, message: 'Masukkan nama Anda' }]}>
            <Input placeholder="Nama lengkap" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Masukkan email Anda' }]}>
            <Input placeholder="Alamat email aktif" />
          </Form.Item>
          <Form.Item label="Pesan" name="message" rules={[{ required: true, message: 'Tuliskan pesan Anda' }]}>
            <Input.TextArea rows={4} placeholder="Pesan atau pertanyaan" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Kirim Pesan
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
