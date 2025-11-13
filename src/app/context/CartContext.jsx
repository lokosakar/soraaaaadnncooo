'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ Simpan data cart di state
  const [items, setItems] = useState([]);

  // ✅ Ambil data cart dari localStorage waktu awal
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch {
        setItems([]);
      }
    }
  }, []);

  // ✅ Simpan ke localStorage tiap kali items berubah
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  // ✅ Tambah barang ke cart
  const addToCart = (product) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === product.id);
      if (existing) {
        // kalau barang udah ada, qty naik
        return prevItems.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      // kalau barang baru
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  // ✅ Kurangi qty barang (kalau 0 -> hapus)
  const removeFromCart = (id) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // ✅ Hapus semua barang dari cart
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cartItems');
  };

  // ✅ Total harga dan jumlah
  const totalItems = items.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
