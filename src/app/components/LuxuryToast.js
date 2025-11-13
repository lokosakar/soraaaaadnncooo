'use client';
import { message } from 'antd';

export const notifySuccess = (text) => {
  message.success({
    content: text,
    duration: 1.8,
    style: {
      backgroundColor: '#d4af37',
      color: '#000',
      borderRadius: '10px',
      fontWeight: 700,
      padding: '10px 15px',
      boxShadow: '0 0 10px rgba(212,175,55,0.4)',
    },
  });
};
