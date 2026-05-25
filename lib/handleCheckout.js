export const handleCheckout = async (e, cartItems) => {
  e.preventDefault();

  // Build line items from cart
  const lineItems = cartItems?.map((item) => ({
    price: item.stripeId, // Stripe Price ID stored in product
    quantity: item.quantity,
  }));

  if (!lineItems?.length) {
    return;
  }

  try {
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lineItems }),
    });

    const { sessionUrl } = await response.json();
    if (sessionUrl) {
      window.location.href = sessionUrl;
    }
  } catch (error) {
    console.error('Checkout error:', error);
  }
};
