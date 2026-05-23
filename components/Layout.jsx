'use client';

import { StateContext } from '@/context/StateContext';
import { Footer, Navbar } from '../components';

const Layout = ({ children }) => {
  return (
    <StateContext>
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
