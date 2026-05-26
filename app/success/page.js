import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BsBagCheckFill } from 'react-icons/bs';
import { stripe } from '../../lib/stripe';
import ClearCartOnSuccess from './ClearCartOnSuccess';
import SuccessConfetti from './SuccessConfetti';

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  const { status, customer_details, line_items } = session;
  const customerEmail = customer_details?.email;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    // Format order details for email
    const items =
      line_items?.data?.map((item) => ({
        name: item.description || 'Product',
        quantity: item.quantity,
        price: item.amount_total / 100, // Convert from cents to dollars
      })) || [];

    const total = session.amount_total / 100; // Convert from cents to dollars
    const orderNumber = session_id.substring(0, 12).toUpperCase();
    const orderDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Send confirmation email
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-email`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerEmail,
            customerName: customer_details?.name || 'Dear Valued Customer',
            orderNumber,
            items,
            total,
            orderDate,
          }),
        }
      );
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
    }

    return (
      <div className="success-wrapper">
        <ClearCartOnSuccess />
        <SuccessConfetti />
        <div className="success">
          <p className="icon">
            <BsBagCheckFill />
          </p>
          <h2>Thank you for your order!</h2>
          <p className="email-msg">
            A confirmation email will be sent to {customerEmail}.
          </p>
          <p className="description">
            If you have any questions, please email
            <a className="email" href="mailto:order@example.com">
              order@example.com
            </a>
          </p>
          <Link href="/">
            <button type="button" width="300px" className="btn">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
