'use client';

import { useStateContext } from '@/context/StateContext';
import { useEffect } from 'react';

const ClearCartOnSuccess = () => {
  const { clearCart } = useStateContext();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
};

export default ClearCartOnSuccess;
