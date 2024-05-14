import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';

const users = [
  {
    id: Math.random(),
    name: 'Rodrigo Costa',
    username: 'costarodrigo22',
  },
  {
    id: Math.random(),
    name: 'Gabriel Alves',
    username: 'souzagabriel1',
  },
  {
    id: Math.random(),
    name: 'Guilherme Vieira',
    username: 'viieiiragui',
  },
  {
    id: Math.random(),
    name: 'Mateus Silva',
    username: 'maateusilva',
  },
];

export function UsersList() {
  return (
    <div className="space-y-4">
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

          <Switch />
        </div>
      ))}
    </div>
  );
}
