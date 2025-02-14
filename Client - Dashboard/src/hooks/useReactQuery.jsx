import { useQuery } from 'react-query';

export default function useReactQuery(
  queryKey,
  queryFunction,
  reqQuery = false,
) {

  const { data, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => queryFunction(reqQuery && reqQuery),
  });

  const mainData = data && data?.data;
  return { mainData, isLoading, refetch };
}
