'use client';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

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

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

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
