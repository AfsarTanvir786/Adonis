import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SingleNote from './Note';
import RequireLogin from '@/utils/requireLogin';
import { useMyNoteList } from '@/hooks/query/note/useMyNoteList';
import { useState } from 'react';
import type { Note } from '@/types/type';

function NoteList() {
  const user = useSelector((state: RootState) => state.authentication.user);

  // controlled pagination options
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<5 | 10 | 20>(10);
  const [sortBy, setSortBy] = useState<'createdAt' | 'title'>('createdAt');
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('desc');
  const [type, setType] = useState<'all' | 'public' | 'private'>('all');

  if (!user || user.name === 'no user') {
    return <RequireLogin message="Please login to view your note list" />;
  }

  const { data, isLoading, isError } = useMyNoteList(
    user.id,
    {
      page,
      limit,
      sortBy,
      orderBy,
    },
    type
  );

  const noteList = data?.data ?? [];
  const canManage = user.role === 'admin';
  const meta = data?.meta;

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center mt-10">Error fetching my notes</p>;

  return (
    <div className="p-4 space-y-6">
      <p>myNote/noteslist.tsx</p>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Notes</h2>

        <Button className="bg-indigo-500 text-white hover:bg-indigo-600">
          <Link to="/notes/create">Add New Note</Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Type filter */}
        <div className="flex gap-2">
          {['all', 'public', 'private'].map((t) => (
            <Button
              key={t}
              variant={type === t ? 'default' : 'outline'}
              onClick={() => {
                setType(t as any);
                setPage(1);
              }}
            >
              {t.toUpperCase()}
            </Button>
          ))}
        </div>

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
          onChange={(e) => setSortBy(e.target.value as 'createdAt' | 'title')}
          className="border rounded px-2 py-1"
        >
          <option value="createdAt">Created At</option>
          <option value="title">Name</option>
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

      {/* Notes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {noteList?.map((note: Note) => (
          <SingleNote key={note.id} note={note} canManage={canManage} />
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

export default NoteList;
