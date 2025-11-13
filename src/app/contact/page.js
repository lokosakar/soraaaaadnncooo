'use client';
import React, { useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { gsap } from 'gsap';

export default function ContactPage() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: '#0f0f0f',
        color: '#fff',
        padding: '100px 20px',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '42px', color: '#d4af37', marginBottom: '40px' }}>Contact Us</h1>
      <p style={{ maxWidth: '700px', margin: '0 auto 50px', fontSize: '17px', opacity: 0.8 }}>
        Have any questions or collaboration ideas? We’d love to hear from you.
      </p>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        <Form layout="vertical">
          <Form.Item label="Name" required>
            <Input placeholder="Your full name" />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input placeholder="your@email.com" />
          </Form.Item>
          <Form.Item label="Message" required>
            <Input.TextArea rows={5} placeholder="Type your message..." />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: '#b08c4f',
                border: 'none',
                width: '100%',
              }}
            >
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
