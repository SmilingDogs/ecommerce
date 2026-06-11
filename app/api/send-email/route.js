import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { OrderConfirmationEmail } from '../../../lib/emails/OrderConfirmationEmail.jsx';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { customerEmail, customerName, orderNumber, items, total, orderDate } =
    await request.json();

  if (!customerEmail) {
    return NextResponse.json(
      { error: 'Customer email is required' },
      { status: 400 }
    );
  }

  const emailComponent = (
    <OrderConfirmationEmail
      customerName={customerName}
      customerEmail={customerEmail}
      orderNumber={orderNumber}
      items={items}
      total={total}
      orderDate={orderDate}
    />
  );

  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: customerEmail,
      subject: `Order Confirmation #${orderNumber}`,
      react: emailComponent,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.data?.id,
    });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
