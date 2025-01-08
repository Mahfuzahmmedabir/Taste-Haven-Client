import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../page/shared/Footer/Footer';
import Navbar from '../page/shared/Navbar/Navbar';

const Main = () => {
  const location = useLocation();
  const noNavbarFooter = location.pathname.includes('login') || location.pathname.includes('signup');

  return (
    <div>
      {noNavbarFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noNavbarFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;