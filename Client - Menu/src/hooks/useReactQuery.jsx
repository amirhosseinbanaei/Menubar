import { useQuery } from 'react-query';
export default function useReactQuery(
  queryKey,
  queryFunction,
  reqOptions = false,
) {
  const { data, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => queryFunction(reqOptions && reqOptions),
  });

  const mainData = data && data?.data;
  return { mainData, isLoading, refetch };
}
