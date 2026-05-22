import { Footer, Navbar } from '../components';

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
