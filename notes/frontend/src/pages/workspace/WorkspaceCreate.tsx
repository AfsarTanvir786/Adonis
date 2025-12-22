import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { useWorkspaceCreate } from '@/hooks/query/workspace/useWorkspaceCreate';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import RequireLogin from '@/utils/requireLogin';
import { useNavigate } from 'react-router-dom';

/* ---------------- Schema ---------------- */

const workspaceSchema = z.object({
  name: z.string().min(3),
  description: z.string().max(255).optional(),
});

type WorkspaceFormValues = z.infer<typeof workspaceSchema>;

/* ---------------- Component ---------------- */

export default function WorkspaceCreate() {
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
            You don't have permission to create any workspace
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  const createWorkspace = useWorkspaceCreate();

  const form = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  return (
    <Card className="m-10 max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Create Workspace</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              createWorkspace.mutate(values)
            )}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Workspace name" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Optional description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button disabled={createWorkspace.isPending}>
                {createWorkspace.isPending ? 'Creating...' : 'Create Workspace'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
