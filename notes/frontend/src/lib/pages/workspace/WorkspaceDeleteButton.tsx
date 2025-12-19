import { Button } from '@/components/ui/button'
import { useWorkspaceDelete } from '@/hooks/query/workspace/useWorkspaceDelete'
import { useParams } from 'react-router-dom';

export default function WorkspaceDeleteButton() {
  const { id } = useParams<{ id: string }>();
  const workspaceId = Number(id);
  const deleteMutation = useWorkspaceDelete();

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this workspace?')) return;
    deleteMutation.mutate(workspaceId);
  }

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
