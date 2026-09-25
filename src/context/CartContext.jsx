import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cognisys_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cognisys_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id || i.slug === item.slug);
      if (existing) {
        return prev.map(i => (i.id === item.id || i.slug === item.slug) ? { ...i, qty: (i.qty || 1) + 1 } : i);
      }
      return [...prev, { ...item, qty: 1, addedAt: new Date().toISOString() }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemIdOrSlug) => {
    setCartItems(prev => prev.filter(i => i.id !== itemIdOrSlug && i.slug !== itemIdOrSlug));
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('cognisys_cart');
    } catch (e) {}
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      totalItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
