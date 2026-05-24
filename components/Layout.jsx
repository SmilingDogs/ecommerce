'use client';
import { StateContext } from '@/context/StateContext';
import { Toaster } from 'react-hot-toast';
import { Footer, Navbar } from '../components';

const Layout = ({ children }) => {
  return (
    <StateContext>
      <Toaster />
      <>
        <header>
          <Navbar />
        </header>
        <main className="main-container">{children}</main>
        <footer>
          <Footer />
        </footer>
      </>
    </StateContext>
  );
};

export default Layout;
