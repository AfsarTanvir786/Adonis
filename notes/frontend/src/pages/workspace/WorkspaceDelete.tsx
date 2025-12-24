import { Button } from '@/components/ui/button';
import { useWorkspaceDelete } from '@/hooks/query/workspace/useWorkspaceDelete';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function WorkspaceDelete() {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.authentication.user)!;
  const navigate = useNavigate();

  if (user.role === 'member') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            You don't have permission to delete any workspace
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  const workspaceId = Number(id);
  const deleteMutation = useWorkspaceDelete();

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this workspace?')) return;
    deleteMutation.mutate(workspaceId);
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={deleteMutation.isPending}
    >
      {deleteMutation.isPending ? 'Deleting...' : 'Delete Workspace'}
    </Button>
  );
}
