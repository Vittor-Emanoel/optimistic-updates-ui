import { useUpdateUser } from '@/app/hooks/useUpdateUser';
import { useUsers } from '@/app/hooks/useUsers';
import { cn } from '@/app/libs/utils';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { Switch } from './ui/switch';

export function UsersList() {
  const { users, isLoading } = useUsers();
  const { updateUser } = useUpdateUser();

  async function handleBlockChange(id: string, blocked: boolean) {
    try {
      await updateUser({ id, blocked });
    } catch {
      toast.error('Erro ao cadastrar o usuario.');
    }
  }

  return (
    <div className="space-y-4">
      {isLoading && (
        <>
          <Skeleton className="h-[74px]" />
          <Skeleton className="h-[74px]" />
          <Skeleton className="h-[74px]" />
        </>
      )}

      {users.map((user) => (
        <div
          key={user.id}
          className={cn(
            'flex items-center justify-between border p-4 rounded-md',
            user.status === 'pending' && 'opacity-70',
            user.status === 'error' && 'border-destructive',
          )}
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://github.com/${user.username}.png`} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div>
              <strong className="text-lg block leading-4">{user.name}</strong>
              <small className="text-muted-foreground">@{user.username}</small>
            </div>
          </div>

          <Switch
            checked={user.blocked}
            onCheckedChange={(blocked) => handleBlockChange(user.id, blocked)}
            disabled={user.status === 'pending'}
          />
        </div>
      ))}
    </div>
  );
}
