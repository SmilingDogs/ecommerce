'use client';

import { useStateContext } from '@/context/StateContext';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { Cart } from '.';

const Navbar = () => {
  const { totalQuantities, showCart, setShowCart } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">SmilingDog&apos;s Gadgets</Link>
      </p>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
