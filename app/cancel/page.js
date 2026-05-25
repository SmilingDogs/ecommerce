'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function CancelPage() {
  useEffect(() => {
    // Clear cart or perform any cleanup if needed
    console.log('Order was cancelled');
  }, []);

  return (
    <div className="success-wrapper">
      <div className="cancel">
        <p className="icon" style={{ color: '#f02d34', fontSize: '50px' }}>
          ✕
        </p>
        <h2>Order cancelled</h2>
        <p className="email-msg">Your order has been cancelled.</p>
        <Link href="/">
          <button type="button" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
