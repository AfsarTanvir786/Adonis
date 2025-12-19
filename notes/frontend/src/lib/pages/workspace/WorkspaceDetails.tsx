import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useWorkspace } from '@/hooks/query/workspace/useWorkspace';
import { Link, useParams } from 'react-router-dom';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import RequireLogin from '@/utils/requireLogin';
import NoteListPagination from '../note/notesList';

function WorkspaceDetails({ canManage }: { canManage: boolean }) {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.authentication.user);

  if (!user || user.name === 'no user') {
    return (
      <RequireLogin message="You have to login to view this workspace details" />
    );
  }
  const { data: workspace, isLoading, isError } = useWorkspace(Number(id));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching Workspace details</p>;
  if (!workspace || !workspace.data) return <p>No Workspace found</p>;
  canManage =
    canManage ||
    user.role === 'admin' ||
    user.role === 'owner' ||
    workspace.data.userId === user.id;
  return (
    <div>
      <Card className="mt-6 w-96 m-4">
        <CardHeader color="blue-gray" className="m-2 relative h-56">
          <img src="/src/assets/images/404_space-gif.gif" alt="card-image" />
        </CardHeader>

        <CardContent>
          <p className="mb-3">
            <b>Title: </b>
            {workspace.data?.name}
          </p>
          <p className="mb-2">
            <b>Company Id: </b>
            {workspace.data.companyId}
          </p>
          <p className="mb-2">
            <b>Description: </b>
            {workspace.data.description}
          </p>
          <p>
            <b>Workspace Id: </b>
            {workspace.data.id}
          </p>
          {canManage && (
            <div className="mt-4 flex justify-between">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md shadow">
                <Link
                  to={`/workspaces/edit/${workspace.data.id}`}
                  state={canManage}
                >
                  Edit
                </Link>
              </button>

              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md shadow">
                <Link
                  to={`/workspaces/delete/${workspace.data.id}`}
                  state={canManage}
                >
                  Delete
                </Link>
              </button>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0"></CardFooter>
      </Card>
      <NoteListPagination workspaceId={workspace.data?.id} />
    </div>
  );
}

export default WorkspaceDetails