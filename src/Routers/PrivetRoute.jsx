import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <>
        <p className='text-center'>
        <span className="loading loading-spinner text-error"></span>
        </p>
      </>
    );
  }
    if (user) {
      return children;
    }

  return <Navigate to='/login' state={{from: location}} replace></Navigate>;
};
export default PrivetRoute;
