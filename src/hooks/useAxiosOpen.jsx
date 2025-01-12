import axios from 'axios';

const axiosOpen = axios.create({
  baseURL: 'https://bistro-boss-server-snowy-chi.vercel.app',
});

const useAxiosOpen = () => {
  return axiosOpen;
};

export default useAxiosOpen;
