import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUser } from '../services/updateUser';
import { IUser } from '../types/IUser';
import { USERS_QUERY_KEY } from './useUsers';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    onMutate: (variables) => {
      const previousUserData = queryClient.getQueryData<IUser[]>(USERS_QUERY_KEY);
      queryClient.setQueryData<IUser[]>(USERS_QUERY_KEY, (old) =>
        old?.map((user) => (user.id === variables.id ? { ...user, ...variables } : user)),
      );
      return { previousUserData };
    },

    //Rollback
    onError: async (_error, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });
      queryClient.setQueryData<IUser[]>(USERS_QUERY_KEY, context?.previousUserData);
    },
  });
  return {
    updateUser: mutateAsync,
    isLoading: isPending,
  };
}
