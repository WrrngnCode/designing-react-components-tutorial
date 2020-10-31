import React, { useContext } from 'react';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import { ThemeContext, ThemeProvider, THEMELIST } from '../contexts/ThemeContext'
import ReactNotifications from 'react-notifications-component'



const LayoutComponent = ({ children }) => {

  const { theme } = useContext(ThemeContext);

  const classNameValue = theme === THEMELIST.DARK ?
    'overflow-auto bg-white' :
    'overflow-auto bg-gray-700';

  return (
    <div className={classNameValue}>
      <ReactNotifications/>
      <div className="mx-4 my-3">
        <Header />
        <Menu />
        {children}
        <Footer />
      </div>
    </div>
  )
};

const Layout = ({ children }) => {

  return (
    <ThemeProvider startingTheme={THEMELIST.LIGHT}>
      <LayoutComponent>{children}</LayoutComponent>
    </ThemeProvider>
  )
  
}


export default Layout;
