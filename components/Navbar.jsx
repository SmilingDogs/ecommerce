'use client';

import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

const Navbar = () => {
  const logSomething = () => {
    console.log('click');
  };
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Headphones</Link>
      </p>

      <button type="button" className="cart-icon" onClick={logSomething}>
        <AiOutlineShopping />
        <span className="cart-item-qty">2</span>
      </button>
    </div>
  );
};

export default Navbar;
