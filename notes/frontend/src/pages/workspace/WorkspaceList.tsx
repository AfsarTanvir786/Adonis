import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import SingleWorkspace from './Workspace';
import { useWorkspacePaginatedList } from '@/hooks/query/workspace/useWorkspacePaginatedList';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function WorkspaceList() {
  const user = useSelector((state: RootState) => state.authentication.user)!;

  // controlled pagination options
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<5 | 10 | 20>(10);
  const [sortBy, setSortBy] = useState<'createdAt' | 'name'>('createdAt');
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('desc');

  const { data, isLoading, isError } = useWorkspacePaginatedList(
    user.companyId,
    {
      page,
      limit,
      sortBy,
      orderBy,
    }
  );

  const workspaces = data?.data ?? [];
  const canManage = user.role === 'admin' || user.role === 'owner';
  const meta = data?.meta;

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center mt-10">Error fetching workspaces</p>;

  return (
    <div className="p-4">
      <p>workspace/WorkspaceList.tsx</p>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Workspaces</h2>

        {canManage && (
          <Button
            variant="outline"
            className="bg-indigo-500 text-white hover:bg-indigo-600 shadow-md"
          >
            <Link to={'/workspaces/create'} state={canManage}>
              Add New Workspace
            </Link>
          </Button>
        )}
      </div>
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Limit */}
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value) as 5 | 10 | 20)}
          className="border rounded px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'createdAt' | 'name')}
          className="border rounded px-2 py-1"
        >
          <option value="createdAt">Created At</option>
          <option value="name">Name</option>
        </select>

        {/* Order */}
        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value as 'asc' | 'desc')}
          className="border rounded px-2 py-1"
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspaces.map((w) => (
          <SingleWorkspace key={w.id} workspace={w} />
        ))}
      </div>

      {/* Pagination Controls */}
      {meta && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            disabled={meta.currentPage <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <span>
            Page {meta.currentPage} of {meta.lastPage}
          </span>

          <Button
            variant="outline"
            disabled={meta.currentPage >= meta.lastPage}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default WorkspaceList;
