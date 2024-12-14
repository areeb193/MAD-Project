import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure of the cart item and the cart context
type Product = {
  id: string;
  image: string;
  name: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};

type CartContextType = {
  items: CartItem[];
  total: number;
  addItem: (product: Product, size: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id && item.size === size);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1, size }];
      }
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, total, addItem, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
