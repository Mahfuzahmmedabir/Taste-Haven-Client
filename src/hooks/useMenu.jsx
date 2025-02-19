
import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "./useAxiosOpen";


const useMenu = () => {
  const axiosOpen = useAxiosOpen()
  const { data: menu=[], isLoading: loading, refetch } = useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      const res = await axiosOpen.get('/menu');
      return res.data;
    },
  });
  return[menu, loading, refetch]
  
}

export default useMenu;