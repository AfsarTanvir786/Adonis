import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useWorkspaceList } from '@/hooks/query/useWorkspaces';
import SingleWorkspace from './Workspace';

function WorkspaceList() {
    const user = useSelector((state: RootState) => state.authentication.user);
    if (!user) {
        return <>Please enter first</>;
    }
    const { data: workspaceList, isLoading, isError } = useWorkspaceList();
    // const user = useSelector((state: RootState) => state.authentication.user);
    const canManage = user.role === 'admin';

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (isError)
        return <p className="text-center mt-10">Error fetching Workspaces</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Workspaces</h2>

                {/* {canManage && (
                    <Button
                        variant="outline"
                        className="bg-indigo-500 text-white hover:bg-indigo-600 shadow-md"
                    >
                        <Link to={'/workspaces/create'} state={canManage}>
                            Add New Workspace
                        </Link>
                    </Button>
                )} */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {workspaceList?.data?.map((w) => (
                    <SingleWorkspace
                        key={w.id}
                        workspace={w}
                        canManage={canManage}
                    />
                ))}
            </div>
        </div>
    );
}

export default WorkspaceList;
