import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '../../../lib/stripe';

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    // Get line items from request body
    const { lineItems } = await request.json();

    if (!lineItems || lineItems.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Create Checkout Session with line items from cart
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json({ sessionUrl: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
