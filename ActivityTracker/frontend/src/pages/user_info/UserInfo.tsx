import { Button } from '@/components/ui/button';
import { getUsersPagination } from '@/hooks/admin/getUsers';
import { useState } from 'react';
import { AddUserModal } from './AddUserModal';
import { useDebounce } from '@/hooks/useDebounce';
import { Search } from 'lucide-react';
import { Input } from '@/components/common/Input';

function UserInfo() {
  const [searchTerm, setSearchTerm] = useState('');
  const search = useDebounce(searchTerm, 500);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<5 | 10 | 20>(10);
  const [sortBy, setSortBy] = useState<'lastLoginAt' | 'name'>('name');
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('desc');
  const [showAddUser, setShowAddUser] = useState(false);

  const { data, isLoading, isError } = getUsersPagination({
    page,
    limit,
    sortBy,
    orderBy,
    search,
  });

  const users = data?.data ?? [];
  const meta = data?.meta;

  return (
    <section className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-semibold">Team Members</h2>
        <Button onClick={() => setShowAddUser(true)}>Add User</Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-xl border">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => {
              setPage(1); // reset pagination on search
              setSearchTerm(e.target.value);
            }}
            className="pl-9"
          />
        </div>

        {/* Limit */}
        <select
          value={limit}
          onChange={(e) => {
            setPage(1);
            setLimit(Number(e.target.value) as 5 | 10 | 20);
          }}
          className="rounded-md border px-3 py-2"
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
        </select>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="rounded-md border px-3 py-2"
        >
          <option value="name">Name</option>
          <option value="lastLoginAt">Last Login</option>
        </select>

        {/* Order */}
        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value as any)}
          className="rounded-md border px-3 py-2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* States */}
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          Failed to load users. Please try again.
        </div>
      )}

      {!isLoading && !isError && users.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-600">
          No users found for “<strong>{search}</strong>”
        </div>
      )}

      {/* User Cards */}
      {!isLoading && users.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    user.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Role</span>
                  <span className="capitalize">{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last login</span>
                  <span>
                    {user.lastLoginAt
                      ? new Date(user.lastLoginAt).toLocaleString()
                      : 'Never'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta && meta.lastPage > 1 && (
        <div className="flex justify-center gap-4 pt-6">
          <Button
            variant="outline"
            disabled={meta.currentPage <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
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

      {showAddUser && <AddUserModal onClose={() => setShowAddUser(false)} />}
    </section>
  );
}

export default UserInfo;
