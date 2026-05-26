'use client';

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="success-wrapper">
      <div className="cancel">
        <p className="icon" style={{ color: '#f02d34', fontSize: '50px' }}>
          x
        </p>
        <h2>Order cancelled</h2>
        <p className="email-msg">
          Your order has been cancelled. Your cart is still saved.
        </p>
        <Link href="/">
          <button type="button" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
