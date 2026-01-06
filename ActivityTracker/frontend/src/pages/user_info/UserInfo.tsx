import { Button } from '@/components/ui/button';
import { getUsersPagination } from '@/hooks/admin/getUsers';
import { useState } from 'react';
import { AddUserModal } from './AddUserModal';
import { useDebounce } from '@/hooks/useDebounce';
import { ArrowLeft, Search, Trash2 } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { Link } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { useUserDelete } from '@/hooks/admin/useUserDelete';

function UserInfo() {
  const [searchTerm, setSearchTerm] = useState('');
  const search = useDebounce(searchTerm, 500);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<5 | 10 | 20>(10);
  const [sortBy, setSortBy] = useState<'lastLoginAt' | 'name'>('name');
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('desc');
  const [showAddUser, setShowAddUser] = useState(false);
  const deleteMutation = useUserDelete();

  const { data, isLoading, isError } = getUsersPagination({
    page,
    limit,
    sortBy,
    orderBy,
    search,
  });

  const { data: user } = useProfile();

  const users = data?.data ?? [];
  const meta = data?.meta;

  const canDelete = user && user?.company.ownerEmail === user.email;

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    deleteMutation.mutate(id);
  };

  return (
    <section className="p-4 space-y-6">
      <Link to="/dashboard">
        <Button variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>
      {/* Header */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

      {/* User List */}
      {!isLoading && users.length > 0 && (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col sm:flex-row sm:items-center
                   justify-between gap-4
                   rounded-2xl border bg-white p-5
                   shadow-sm hover:shadow-md transition"
            >
              {/* Left: User info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="flex h-12 w-12 items-center justify-center
                          rounded-full bg-gray-100 text-gray-700
                          font-semibold uppercase"
                >
                  {user.name?.charAt(0)}
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>

                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500">
                    <span className="capitalize">Role: {user.role}</span>
                    <span>
                      Last login:{' '}
                      {user.lastLoginAt
                        ? new Date(user.lastLoginAt).toLocaleString()
                        : 'Never'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Status + Actions */}
              <div className="flex items-center gap-4">
                {/* Status */}
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1
                        text-xs font-medium ${
                          user.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>

                {/* Actions */}
                {canDelete && (
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={deleteMutation.isPending}
                    className="flex items-center gap-2 rounded-md
                         border border-red-200 px-3 py-1.5
                         text-sm text-red-600
                         hover:bg-red-50
                         disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                  </button>
                )}
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
