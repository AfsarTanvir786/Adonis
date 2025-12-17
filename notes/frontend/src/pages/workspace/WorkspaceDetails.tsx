import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useWorkspace } from '@/hooks/query/useWorkspace';
import { useParams } from 'react-router-dom';
import NoteList from '../note/NoteList';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import RequireLogin from '@/utils/requireLogin';

function WorkspaceDetails() {
    const { id } = useParams<{ id: string }>();
        const user = useSelector((state: RootState) => state.authentication.user);

    if (!user || user.name === 'no user') {
        return (
            <RequireLogin message="You have to login to view this workspace details" />
        );
    }
    const {
        data: workspace,
        isLoading,
        isError,
    } = useWorkspace(Number(id));

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching Workspace details</p>;
    if (!workspace) return <p>No Workspace found</p>;
  return (
      <div>
          <Card className="mt-6 w-96 m-4">
              <CardHeader color="blue-gray" className="m-2 relative h-56">
                  <img
                      src="/src/assets/images/404_space-gif.gif"
                      alt="card-image"
                  />
              </CardHeader>

              <CardContent>
                  <p className="mb-3">
                      <b>Title: </b>
                      {workspace.data?.name}
                  </p>
                  <p className="mb-2">
                      <b>Company Id: </b>
                      {workspace.data?.companyId}
                  </p>
                  <p>
                      <b>Workspace Id: </b>
                      {workspace.data?.id}
                  </p>
              </CardContent>
              <CardFooter className="pt-0"></CardFooter>
          </Card>
          <NoteList workspaceId={workspace.data?.id} />
      </div>
  );
}

export default WorkspaceDetails