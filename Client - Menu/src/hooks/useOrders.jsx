import { useQuery } from 'react-query';
import { getOrders } from '../services/Axios/Requests/Orders';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function useOrders() {
  const { currentUser } = useContext(AuthContext);
  const { data, isLoading: isLoadingOrders } = useQuery({
    queryKey: 'Orders',
    queryFn: () => getOrders(currentUser._id),
  });
  const orders = data && data?.data;
  return { orders, isLoadingOrders };
}
