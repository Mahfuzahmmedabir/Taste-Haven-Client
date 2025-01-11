import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

export const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('acces-token');
      console.log('interto', token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async error => {
      const status = error.response.status;
      console.log('status error in interceptors', status);
      if (status === 401 || status === 403) {
        await logout();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};
export default useAxiosSecure;
