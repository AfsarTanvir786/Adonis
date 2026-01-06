import type { RootState } from '@/store';
import type { Note } from '@/types/type';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CanManage({ note }: { note: Note }) {
  const user = useSelector((state: RootState) => state.authentication.user)!;
  const canManage = user.id === note.userId || user.role === 'admin';
  return canManage ? (
    <div className="mt-auto flex gap-3 mb-1">
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md shadow">
        <Link to={`/notes/edit/${note.id}`}>
          Edit
        </Link>
      </button>

      <button className="bg-white hover:bg-lime-200 text-black px-3 py-1.5 rounded-md shadow">
        <Link to={`/notes/details/${note.id}`}>
          Details
        </Link>
      </button>
    </div>
  ) : null;
}
