import { Button } from '@/components/ui/button';
import type { RootState } from '@/store';
import type { Workspace } from '@/types/type';
import RequireLogin from '@/utils/requireLogin';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function SingleWorkspace({
    workspace,
    canManage,
}: {
    workspace: Workspace;
    canManage: boolean;
}) {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.authentication.user);

    if (!user || user.name === 'no user') {
        return (
          <RequireLogin message="Please login to view this workspace details" />
        );
    }
    return (
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <h3 className="text-xl font-semibold mb-3">{workspace.name}</h3>
        <p>workspace id : {workspace.id}</p>
        <p className="mb-2 text-sm">
          <span className="font-medium">Description: </span>
          {workspace.description}
        </p>

        <p className="mb-2 text-sm">
          <span className="font-medium">Creator id: </span>
          {workspace.userId}
        </p>

        <Button
          variant="outline"
          onClick={() =>
            navigate(`details/${workspace.id}`, { state: canManage })
          }
        >
          Explore
        </Button>
      </div>
    );
}

export default SingleWorkspace;
