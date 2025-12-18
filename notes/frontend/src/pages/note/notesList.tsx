import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import SingleNote from './Note'
import { useNotePagination } from '@/hooks/query/note/useNotePagination'
import type { Note } from '@/types/type'

export default function NoteListPagination({
  workspaceId,
}: {
  workspaceId: number | undefined;
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<'title' | 'createdAt'>('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const { data, isLoading } = useNotePagination(workspaceId!, {
    page,
    pageSize,
    sortBy,
    order,
  });

  // console.log('new data', page, pageSize, sortBy, order);



  if (isLoading) return <p>Loading notes...</p>;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Sort */}
        <Select
          value={`${sortBy}-${order}`}
          onValueChange={(v) => {
            const [s, o] = v.split('-');
            setSortBy(s as any);
            setOrder(o as any);
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt-desc">Latest</SelectItem>
            <SelectItem value="createdAt-asc">Oldest</SelectItem>
            <SelectItem value="title-asc">Title A–Z</SelectItem>
            <SelectItem value="title-desc">Title Z–A</SelectItem>
          </SelectContent>
        </Select>

        {/* Page size */}
        <Select
          value={String(pageSize)}
          onValueChange={(v) => {
            setPageSize(Number(v));
            setPage(1);
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.data?.data?.map((note: Note, index: number) => (
          <SingleNote key={note.id} index={index} note={note} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>

        <span className="text-sm">
          Page {page} of {data.data?.meta.lastPage}
        </span>

        <Button
          variant="outline"
          disabled={page >= data.data?.meta.lastPage}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
