import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useNoteGet } from '@/hooks/query/my_note/useNoteGet';

export default function NoteAccessGuard() {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.authentication.user)!;

  const { data: note, isLoading, isError } = useNoteGet(Number(id), user.id);

  if (isLoading) {
    return <div className="p-4">Checking permissions…</div>;
  }

  if (isError || !note) {
    return <Navigate to="/unauthorized" replace />;
  }

  const isOwner = note.userId === user.id;
  const isAdmin = user.role === 'admin';

  if (!isOwner && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
