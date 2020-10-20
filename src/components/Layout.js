import React from 'react';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="mx-4 my-3">
    <Header />
    <Menu />
    {children}
    <Footer />
  </div>
);

export default Layout;
