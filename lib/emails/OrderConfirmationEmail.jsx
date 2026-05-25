export const OrderConfirmationEmail = ({
  customerName,
  customerEmail,
  orderNumber,
  items,
  total,
  orderDate,
}) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
    }}
  >
    {/* Header */}
    <div
      style={{
        backgroundColor: '#f02d34',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ margin: 0 }}>SmilingDog&apos;s Gadgets</h1>
      <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
        Order Confirmation
      </p>
    </div>

    {/* Main Content */}
    <div style={{ padding: '30px', backgroundColor: '#f9f9f9' }}>
      <p style={{ fontSize: '16px', color: '#333' }}>
        Hi {customerName || 'Valued Customer'},
      </p>

      <p style={{ color: '#666', lineHeight: '1.6' }}>
        Thank you for your purchase! We&apos;re excited to send your order to
        you. Here&apos;s a summary of what you ordered.
      </p>

      {/* Order Details */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0',
        }}
      >
        <h2 style={{ color: '#f02d34', fontSize: '16px', marginTop: 0 }}>
          Order Details
        </h2>

        <p style={{ margin: '10px 0', color: '#666' }}>
          <strong>Order Number:</strong> {orderNumber || 'N/A'}
        </p>
        <p style={{ margin: '10px 0', color: '#666' }}>
          <strong>Order Date:</strong> {orderDate}
        </p>
        <p style={{ margin: '10px 0', color: '#666' }}>
          <strong>Email:</strong> {customerEmail}
        </p>
      </div>

      {/* Items */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0',
        }}
      >
        <h2 style={{ color: '#f02d34', fontSize: '16px', marginTop: 0 }}>
          Items Ordered
        </h2>

        {items && items.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '10px 0',
                    color: '#666',
                    fontWeight: 'bold',
                  }}
                >
                  Product
                </th>
                <th
                  style={{
                    textAlign: 'center',
                    padding: '10px 0',
                    color: '#666',
                    fontWeight: 'bold',
                  }}
                >
                  Qty
                </th>
                <th
                  style={{
                    textAlign: 'right',
                    padding: '10px 0',
                    color: '#666',
                    fontWeight: 'bold',
                  }}
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 0', color: '#333' }}>
                    {item.name}
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      padding: '10px 0',
                      color: '#333',
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      textAlign: 'right',
                      padding: '10px 0',
                      color: '#333',
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#666' }}>No items found</p>
        )}
      </div>

      {/* Total */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'right',
          margin: '20px 0',
        }}
      >
        <h3 style={{ color: '#f02d34', marginTop: 0 }}>
          Total: ${total.toFixed(2)}
        </h3>
      </div>

      {/* Message */}
      <p style={{ color: '#666', lineHeight: '1.6', margin: '20px 0' }}>
        We&apos;ll notify you when your order ships. If you have any questions,
        feel free to reply to this email.
      </p>

      <p style={{ color: '#666' }}>
        Best regards,
        <br />
        <strong>SmilingDog&apos;s Gadgets Team</strong>
      </p>
    </div>

    {/* Footer */}
    <div
      style={{
        backgroundColor: '#333',
        color: '#ccc',
        padding: '20px',
        textAlign: 'center',
        fontSize: '12px',
      }}
    >
      <p style={{ margin: 0 }}>
        © 2026 SmilingDog&apos;s Gadgets. All rights reserved.
      </p>
      <p style={{ margin: '5px 0 0 0' }}>
        If you didn&apos;t place this order, please contact us immediately at{' '}
        <a
          href="mailto:orders@example.com"
          style={{ color: '#f02d34', textDecoration: 'none' }}
        >
          orders@example.com
        </a>
      </p>
    </div>
  </div>
);
