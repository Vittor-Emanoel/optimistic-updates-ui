import { useQuery } from '@tanstack/react-query';
import { listUsers } from '../services/listUser';

export function useUsers() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: listUsers,
  });
  return {
    users: data ?? [],
    isLoading,
    refetch,
  };
}
