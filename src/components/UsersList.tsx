import { useUsers } from '@/app/hooks/useUsers';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { Switch } from './ui/switch';

export function UsersList() {
  const { users, isLoading } = useUsers();

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
        <div key={user.id} className="flex items-center justify-between border p-4 rounded-md">
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

          />
        </div>
      ))}
    </div>
  );
}
