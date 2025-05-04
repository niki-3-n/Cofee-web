import { createContext, useContext, useState, ReactNode } from 'react';

// Cart item type definition - matches what we have in Menu.tsx
export interface CartItem {
  id: number;
  productId: number;
  name: string;
  size: string;
  option: string;
  quantity: number;
  price: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartItemsCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    // Check if item already exists in cart (same product, size and option)
    const existingItemIndex = cart.findIndex(
      (cartItem) => 
        cartItem.productId === item.productId && 
        cartItem.size === item.size && 
        cartItem.option === item.option
    );

    if (existingItemIndex > -1) {
      // If item exists, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      setCart(updatedCart);
    } else {
      // If item doesn't exist, add it to cart
      setCart([...cart, item]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(cart.map(item => item.id === id ? {...item, quantity} : item));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total items count
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItemsCount,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext; 