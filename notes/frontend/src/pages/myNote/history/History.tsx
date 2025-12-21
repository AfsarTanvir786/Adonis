import type { RootState } from '@/store';
import type { History } from '@/types/type';
import RequireLogin from '@/utils/requireLogin';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function SingleHistory({ history }: { history: History }) {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authentication.user);

  if (!user || user.name === 'no user') {
    return (
      <RequireLogin message="Please login to view your note history details" />
    );
  }
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <h3 className="text-xl font-semibold mb-3">{history.oldTitle}</h3>

      <p className="mb-2 text-sm">
        <span className="font-medium">Content: </span>
        {history.oldContent}
      </p>

      <p className="mb-2 text-sm">
        <span className="font-medium">note id: </span>
        {history.noteId}
      </p>

      <p>User Id: {history.userId}</p>
      <p>
        update:{' '}
        {history.updatedAt
          ? format(history.updatedAt, 'MMMM dd, yyyy')
          : 'null'}
      </p>
      <p>
        create:{' '}
        {history.createdAt
          ? format(history.createdAt, 'MMMM dd, yyyy hh:mm')
          : 'null'}
      </p>
      <Button
        className="hover:bg-orange-200"
        variant="outline"
        onClick={() => navigate(`${history.id}`)}
      >
        Restore
      </Button>
    </div>
  );
}

export default SingleHistory;
