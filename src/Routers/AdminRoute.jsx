import React from 'react';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const [isAdmin, isAdminLoaing] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoaing) {
    return (
      <>
        <h1>Lodeaing</h1>
      </>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;