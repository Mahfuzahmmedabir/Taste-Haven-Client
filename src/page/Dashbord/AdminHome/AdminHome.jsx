import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];



const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats={} } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-status');
      console.log(res.data);
      return res.data;
    },
  });
  const { data: order=[] } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/order-stats')
      console.log(res.data)
      return res.data
    }
  });


  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = props => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };





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
      {/* chart */}

      <div className="flex">
        <div className="w-6/12">
          <BarChart
            width={500}
            height={300}
            data={order}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: 'top' }}
            >
              {order.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        <div className="w-6/12"></div>
      </div>
    </div>
  );
};

export default AdminHome;
