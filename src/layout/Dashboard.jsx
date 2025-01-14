import React from 'react';
import {
  FaAd,
  FaCalendar,
  FaComment,
  FaEmpire,
  FaEnvelope,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu">
          {isAdmin ? (
            <>
              <li>
                <NavLink to={'/dashbord/adminHome'}>
                  <FaHome className="text-xl"></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to={'/dashbord/addItems'}>
                  <FaUtensils FaUtensils className="text-xl"></FaUtensils>
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to={'/dashbord/manageitems'}>
                  <FaList className="text-xl"></FaList>
                  Manage Itmes
                </NavLink>
              </li>
              <li>
                <NavLink to={'/dashbord/allUser'}>
                  <FaUsers className="text-xl"></FaUsers>
                  All User
                </NavLink>
              </li>
              <div className="divider"></div>
              <li>
                <NavLink to={'/dashbord/Home'}>
                  <FaHome className="text-xl"></FaHome>
                  Home
                </NavLink>
              </li>{' '}
              <li>
                <NavLink to={'/'}>
                  <FaEmpire className="text-xl"> </FaEmpire>
                  Menu
                </NavLink>
              </li>{' '}
              <li>
                <NavLink to={'/'}>
                  <FaEnvelope className="text-xl"></FaEnvelope>
                  Contart
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={'/dashbord/Home'}>
                  <FaShoppingCart className="text-xl"></FaShoppingCart>
                  Home
                </NavLink>
              </li>{' '}
              <li>
                <NavLink to={'/'}>
                  <FaEmpire className="text-xl"> </FaEmpire>
                  Menu
                </NavLink>
              </li>{' '}
              <li>
                <NavLink to={'/'}>
                  <FaEnvelope className="text-xl"></FaEnvelope>
                  Contart
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
