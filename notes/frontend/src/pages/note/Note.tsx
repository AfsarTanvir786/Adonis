import { useNoteVote } from '@/hooks/query/note/useNoteVote';
import { useVote } from '@/hooks/query/note/useVote';
import { useVoteCount } from '@/hooks/query/note/useVoteCount';
import type { RootState } from '@/store';
import type { Note } from '@/types/type';
import RequireLogin from '@/utils/requireLogin';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useSelector } from 'react-redux';

function SingleNote({
  note,
  index,
}: {
  note: Note;
  index?: number;
}) {
  const user = useSelector((state: RootState) => state.authentication.user);
  if (!user || user.name === 'no user') {
    return <RequireLogin message="You have no access to this note." />;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <p>index: {(index ?? 0) + 1}</p>
      <h3 className="text-xl font-semibold mb-3">{note.title}</h3>

      <p className="mb-2 text-sm">
        <span className="font-medium">Content: </span>
        {note.content}
      </p>

      <p className="mb-2 text-sm">
        <span className="font-medium">Type: </span>
        {note.type}
      </p>

      <p className="mb-2 text-sm">
        <span className="font-medium">Published: </span>
        {note.isDraft ? 'No' : 'Yes'}
      </p>
      <p>id: {note.id}</p>
      <p>Workspace id: {note.workspaceId}</p>
      <p>User Id: {note.userId}</p>
      <p>total score: {note.count}</p>
    </div>
  );
}

export default SingleNote;
