import { Button } from '@/components/ui/button';
import { getUsersPagination } from '@/hooks/admin/getUsers';
import { useState } from 'react';

function UserInfo() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<5 | 10 | 20>(10);
  const [sortBy, setSortBy] = useState<'lastLoginAt' | 'name'>('name');
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('desc');
  const { data, isLoading, isError } = getUsersPagination({
    page,
    limit,
    sortBy,
    orderBy,
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-44 rounded-2xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        Failed to load users. Please try again.
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-600">
        No users found.
      </div>
    );
  }
  const users = data.data ?? [];
  const meta = data.meta;

  return (
    <section className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Team Members</h2>
      {/* Filters */}
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
          onChange={(e) => setSortBy(e.target.value as 'name' | 'lastLoginAt')}
          className="border rounded px-2 py-1"
        >
          <option value="lastLoginAt">Last Login At</option>
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => {
          const isActive = user.isActive;

          return (
            <div
              key={user.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Body */}
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">Role</span>
                  <span className="capitalize">{user.role}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Last login</span>
                  <span>
                    {user.lastLoginAt
                      ? new Date(user.lastLoginAt).toLocaleString()
                      : 'Never'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
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
    </section>
  );
}

export default UserInfo;
