import Layout from '@/components/Layout';
import './globals.css';

export const metadata = {
  title: {
    default: "SmilingDog's online store",
    template: "%s | SmilingDog's online store",
  },
  description: 'Smiling Dogs online store built with Next.js and Sanity.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="layout">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
