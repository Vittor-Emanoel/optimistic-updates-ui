import { useCreateUser } from '@/app/hooks/useCreateUser';
import { cn } from '@/app/libs/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlert } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from './ui/Button';
import { Input } from './ui/input';

const createUserSchema = z.object({
  name: z.string().min(3, { message: 'Insira no minimo 3 caracteres' }),
  username: z.string().min(3, { message: 'Insira no minimo 3 caracteres' }),
});

type createUserData = z.infer<typeof createUserSchema>;

export function UserForm() {
  const { createUser } = useCreateUser();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<createUserData>({
    resolver: zodResolver(createUserSchema),
  });

  async function handleSubmit({ username, name }: createUserData) {
    try {
      reset();
      await createUser({
        username,
        name,
        blocked: false,
      });
    } catch {
      toast.error('Erro ao cadastrar o usuario!');
    }
  }

  return (
    <form className="bg-muted/50 p-4 rounded-md" onSubmit={hookFormSubmit(handleSubmit)}>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <Input
            className={cn(errors.name && 'border border-destructive placeholder:text-destructive')}
            placeholder="Nome do usuario"
            {...register('name')}
          />
          {errors.name && (
            <small className="text-destructive flex items-center gap-1 mt-1">
              <CircleAlert size={16} />
              {errors.name?.message}
            </small>
          )}
        </div>
        <div className="flex-1">
          <Input
            className={cn(errors.username && 'border border-destructive placeholder:text-destructive')}
            placeholder="@ no github"
            {...register('username')}
          />
          {errors.username && (
            <small className="text-destructive flex items-center gap-1 mt-1">
              <CircleAlert size={16} />
              {errors.username?.message}
            </small>
          )}
        </div>
      </div>
      <Button type="submit" className="mt-2 w-full">
        Cadastrar
      </Button>
    </form>
  );
}
