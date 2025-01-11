import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider/AuthProvider';
import { IoCart } from 'react-icons/io5';
import useCart from '../../../hooks/useCart';
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [cart] = useCart();
  console.log(cart);
  console.log(user);
  const NavOptions = (
    <>
      <NavLink>Home</NavLink>
      <NavLink to="/menu">Our Menu</NavLink>
      <NavLink to="/order/salad">Order </NavLink>
      <NavLink to="/secret">Secret</NavLink>
      <NavLink to="/dashbord">Dashbord</NavLink>

      {user ? (
        <>
          <btuuon onClick={logout}>LogOut</btuuon>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar fixed z-10 opacity-60 text-white  bg-black max-w-screen-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  rounded-box bg-slate-400 z-[1] mt-3 w-52 p-2 shadow"
            >
              {NavOptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bisto </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu flex gap-6 text-white menu-horizontal px-1">
            {NavOptions}
          </ul>
        </div>

        <div className="navbar-end gap-4">
          <button className="btn">
            <Link to={'/cart'}>
              <IoCart className="text-2xl mr-1"></IoCart>
            </Link>
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
          <Link to={'/login'}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
