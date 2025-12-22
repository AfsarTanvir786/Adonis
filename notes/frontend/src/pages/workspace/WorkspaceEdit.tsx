import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useWorkspace } from '@/hooks/query/workspace/useWorkspace';
import { useEffect } from 'react';
import { useWorkspaceUpdate } from '@/hooks/query/workspace/useWorkspaceUpdate';
import RequireLogin from '@/utils/requireLogin';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

/* ---------------- Schema ---------------- */

const workspaceSchema = z.object({
  name: z.string().min(3),
  description: z.string().max(255).optional(),
});

type WorkspaceFormValues = z.infer<typeof workspaceSchema>;

/* ---------------- Component ---------------- */

export default function WorkspaceEdit() {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.authentication.user);
  const navigate = useNavigate();

  if (!user || user.name === 'no user') {
    return (
      <RequireLogin message="Please login to view this workspace list details" />
    );
  }

  if (user.role === 'member') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            You don't have permission to update any workspace
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  /* Fetch workspace */
  const { data, isLoading } = useWorkspace(Number(id));

  const form = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        description: data.description ?? '',
      });
    }
  }, [data, form]);

  const { mutate, isPending } = useWorkspaceUpdate(Number(id));

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="m-10 h-160 w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Edit Workspace</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutate(values))}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-10">
                  <FormLabel className="text-2xl">Name</FormLabel>
                  <FormControl>
                    <Input className="h-15 text-3xl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-10 text-[24px]">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea className="h-50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="m-10 flex justify-end">
              <Button disabled={isPending}>
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
