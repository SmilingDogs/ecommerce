'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();
const CART_STORAGE_KEY = 'ecommerce-cart';

const buildCurrentCart = (cartItems, product, quantity) => {
  const existingItem = cartItems.find((item) => item._id === product._id);

  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === product._id
        ? { ...cartItem, quantity: cartItem.quantity + quantity }
        : cartItem
    );
  }

  return [...cartItems, { ...product, quantity }];
};

const calculateCartTotals = (cartItems) =>
  cartItems.reduce(
    (totals, item) => ({
      totalPrice: totals.totalPrice + item.price * item.quantity,
      totalQuantities: totals.totalQuantities + item.quantity,
    }),
    { totalPrice: 0, totalQuantities: 0 }
  );

const normalizeCartItems = (cartItems) =>
  cartItems.filter(Boolean).map((item) => ({
    ...item,
    quantity: Math.max(1, Number(item.quantity) || 1),
  }));

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [hasHydratedCart, setHasHydratedCart] = useState(false);

  const syncCartState = useCallback((nextCartItems) => {
    const normalizedCartItems = normalizeCartItems(nextCartItems);
    const nextTotals = calculateCartTotals(normalizedCartItems);

    setCartItems(normalizedCartItems);
    setTotalPrice(nextTotals.totalPrice);
    setTotalQuantities(nextTotals.totalQuantities);
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    setShowCart(false);
    window.localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  useEffect(() => {
    const hydrateCart = () => {
      try {
        const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);

        if (!savedCart) {
          return;
        }

        const parsedCart = JSON.parse(savedCart);
        const storedCartItems = Array.isArray(parsedCart?.cartItems)
          ? parsedCart.cartItems
          : [];

        syncCartState(storedCartItems);
      } catch (error) {
        console.error('Unable to restore cart state:', error);
        window.localStorage.removeItem(CART_STORAGE_KEY);
      } finally {
        setHasHydratedCart(true);
      }
    };

    const hydrateTimeoutId = window.setTimeout(hydrateCart, 0);

    return () => window.clearTimeout(hydrateTimeoutId);
  }, [syncCartState]);

  useEffect(() => {
    if (!hasHydratedCart) {
      return;
    }

    if (!cartItems.length) {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({ cartItems })
    );
  }, [cartItems, hasHydratedCart]);

  const onAdd = (product, quantity) => {
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    setCartItems((currentCartItems) =>
      buildCurrentCart(currentCartItems, product, quantity)
    );
    setQty(1);
    toast.success(`${quantity} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    const findProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - findProductInCart.price * findProductInCart.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - findProductInCart.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuanitity = (id, value) => {
    let foundProduct = cartItems.find((item) => item._id === id);
    let foundProductIndex = cartItems.findIndex(
      (product) => product._id === id
    );

    function updateCartItem(cartItems, foundIndex, updates) {
      return cartItems.map((item, i) =>
        i === foundIndex ? { ...item, ...updates } : item
      );
    }

    if (value === 'inc') {
      setCartItems(
        updateCartItem(cartItems, foundProductIndex, {
          quantity: foundProduct.quantity + 1,
        })
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems(
          updateCartItem(cartItems, foundProductIndex, {
            quantity: foundProduct.quantity - 1,
          })
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const decQty = () => {
    setQty((currentQty) => Math.max(1, currentQty - 1));
  };

  const incQty = () => {
    setQty((currentQty) => currentQty + 1);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        buildCurrentCart,
        clearCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};
//* created a custom hook useStateContext
export const useStateContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useStateContext must be used within StateContext');
  }
  return context;
};
