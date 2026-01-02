import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  createUserSchema,
  type CreateUserInput,
} from '@/schemas/createUser.schema';
import { Button } from '@/components/ui/button';
import { useUserCreate } from '@/hooks/admin/useUserCreate';
import { Loader2 } from 'lucide-react';
import type { AxiosError } from 'axios';

type Props = {
  onClose: () => void;
};

type BackendError = {
  errors?: {
    field: keyof CreateUserInput;
    message: string;
  }[];
};

export function AddUserModal({ onClose }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const { mutate, isPending } = useUserCreate();

  const onSubmit = (data: CreateUserInput) => {
    mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role ?? 'employee',
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          const axiosError = error as AxiosError<BackendError>;
          const backendErrors = axiosError.response?.data?.errors;

          if (backendErrors && backendErrors.length > 0) {
            backendErrors.forEach((err) => {
              setError(err.field, {
                type: 'server',
                message: err.message,
              });
            });
          } else {
            setError('root', {
              message: 'Something went wrong. Please try again.',
            });
          }
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Add User</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <input
              {...register('name')}
              placeholder="Name"
              className="w-full rounded border px-3 py-2"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...register('email')}
              placeholder="Email"
              className="w-full rounded border px-3 py-2"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register('password')}
              placeholder="Password"
              className="w-full rounded border px-3 py-2"
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <select
              {...register('role')}
              className="w-full border rounded-lg px-3 py-3"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Global error */}
          {errors.root && (
            <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {errors.root.message}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create User'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
