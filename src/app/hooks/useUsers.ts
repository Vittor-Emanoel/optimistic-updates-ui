import { useQuery } from '@tanstack/react-query';
import { listUsers } from '../services/listUser';
import { IUser } from '../types/IUser';
import { WithStatus } from '../types/utils';

export const USERS_QUERY_KEY = ['users'];
export type UsersQueryData = WithStatus<IUser>[];
export function useUsers() {
  const { data, isLoading } = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: async () => {
      const users = await listUsers();

      return users as UsersQueryData;
    },
    staleTime: Infinity,
  });
  return {
    users: data ?? [],
    isLoading,
  };
}
