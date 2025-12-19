import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SingleNote from './Note';
import { useNotePagination } from '@/hooks/query/note/useNotePagination';
import type { Note } from '@/types/type';

export default function NoteListPagination({
  workspaceId,
}: {
  workspaceId: number | undefined;
}) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<'name' | 'title' | 'createdAt'>('createdAt');
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('desc');

  const { data, isLoading, isError } = useNotePagination(workspaceId!, {
    page,
    limit,
    sortBy,
    orderBy,
  });

  const publicNotes = data?.data ?? [];
  const meta = data?.meta;
  
  if (isLoading) return <p>Loading notes...</p>;  
  if (isError)
    return <p className="text-center mt-10">Error fetching public notes</p>;


  return (
    <div className="space-y-6">
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

      {/* Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {publicNotes?.map((note: Note, index: number) => (
          <SingleNote key={note.id} index={index} note={note} />
        ))}
      </div>

      {/* Pagination Controls */}
      {meta && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            disabled={meta.currentPage === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <span>
            Page {meta.currentPage} of {meta.lastPage}
          </span>

          <Button
            variant="outline"
            disabled={meta.currentPage === meta.lastPage}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
