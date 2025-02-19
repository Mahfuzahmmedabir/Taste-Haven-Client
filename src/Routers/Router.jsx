import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import Home from '../page/Home/Home';
import Menu from '../page/Home/Menu/Menu';
import Order from '../page/Order/Order/Order';
import Login from '../page/Login/Login';
import Signup from '../page/Signup/Signup';
import Secret from '../page/shared/Secret/Secret';
import PrivetRoute from './PrivetRoute';
import Dashboard from '../layout/Dashboard';
import Cart from '../page/Dashbord/Cart';
import AllUser from '../page/Dashbord/AllUser/AllUser';
import AddItems from '../page/Dashbord/AddItems/AddItems';
import AdminRoute from './AdminRoute';
import ManageItems from '../page/Dashbord/ManageItems/ManageItems';
import Updeat from '../page/Dashbord/Updeat/Updeat';
import Payment from '../page/Dashbord/Payment/Payment';
import AdminHome from '../page/Dashbord/AdminHome/AdminHome';
import UserHome from '../page/Dashbord/UserHome/UserHome';

// const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/menu',
        element: <Menu></Menu>,
      },
      {
        path: '/order/:category',
        element: <Order></Order>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: `/signup`,
        element: <Signup></Signup>,
      },
      {
        path: '/secret',
        element: (
          <PrivetRoute>
            <Secret></Secret>
          </PrivetRoute>
        ),
      },
      {
        path: '/cart',
        element: (
          <PrivetRoute>
            <Cart></Cart>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: 'dashbord',
    element: (
      <PrivetRoute>
        <Dashboard></Dashboard>
      </PrivetRoute>
    ),
    children: [
      {
        path: '/dashbord',
        element: <Cart></Cart>,
      },
      {
        path: '/dashbord/payment',
        element: <Payment></Payment>,
      },
      {
        path: '/dashbord/Home',
        element: <UserHome></UserHome>,
      },

      // admin route
      {
        path: 'adminHome',
        element: <AdminHome></AdminHome>,
      },
      {
        path: 'addItems',
        element: (
          <AdminRoute>
            <AddItems></AddItems>
          </AdminRoute>
        ),
      },
      {
        path: 'allUser',
        element: (
          <AdminRoute>
            <AllUser></AllUser>
          </AdminRoute>
        ),
      },
      {
        path: 'manageitems',
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: 'updeat/:id',
        element: (
          <AdminRoute>
            <Updeat></Updeat>
          </AdminRoute>
        ),
        loader: ({ params }) => fetch(`/menu/${params.id}`),
      },
    ],
  },
]);

export default router;


