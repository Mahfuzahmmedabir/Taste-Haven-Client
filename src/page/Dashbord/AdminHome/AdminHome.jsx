import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-status');
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-center text-3xl font-semibold">Welcome Back</h2>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Balance</div>
          <div className="stat-value">{stats?.result}</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Users</div>
          <div className="stat-value">{stats?.user}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Order</div>
          <div className="stat-value">{stats?.orders}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
