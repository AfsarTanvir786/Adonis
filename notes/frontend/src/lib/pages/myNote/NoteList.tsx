import type { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import SingleNote from './Note'
import RequireLogin from '@/utils/requireLogin'
import { useMyNoteList } from '@/hooks/query/note/useMyNoteList'
import { useState } from 'react'
import type { Note } from '@/types/type'

function NoteList() {
  const user = useSelector((state: RootState) => state.authentication.user)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [type, setType] = useState<'all' | 'public' | 'private'>('all')

  if (!user || user.name === 'no user') {
    return <RequireLogin message="Please login to view your note list" />
  }

  const { data, isLoading, isError } = useMyNoteList({
    userId: user.id,
    page,
    pageSize,
    type,
  })


  const canManage = true

  if (isLoading) return <p className="text-center mt-10">Loading...</p>
  if (isError) return <p className="text-center mt-10">Error fetching notes</p>

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Notes</h2>

        <Button className="bg-indigo-500 text-white hover:bg-indigo-600">
          <Link to="/notes/create">Add New Note</Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
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

        {/* Page size */}
        <select
          className="border rounded px-2 py-1"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Notes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.data?.data?.map((note: Note) => (
          <SingleNote key={note.id} note={note} canManage={canManage} />
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
          Page {data.data?.meta.currentPage} of {data.data?.meta.lastPage}
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

export default NoteList
