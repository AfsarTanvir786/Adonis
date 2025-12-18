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
  canManage,
  index,
}: {
  note: Note;
  canManage: boolean;
  index?: number;
}) {
  const user = useSelector((state: RootState) => state.authentication.user);
  if (!user || user.name === 'no user') {
    return <RequireLogin message="You have no access to this note." />;
  }

  const { data: voteCount, isLoading: voteCountLoading } = useVoteCount(
    note.id
  );
  const { data: noteVote } = useVote(note.id);
  const voteMutation = useNoteVote(note.id);

  const isLiked = noteVote?.data?.vote === 'up';
  const isDisliked = noteVote?.data?.vote === 'down';

  const handleLike = () => {
    voteMutation.mutate(isLiked ? 'down' : 'up');
  };

  const handleDislike = () => {
    voteMutation.mutate(isDisliked ? 'up' : 'down');
  };
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <p>index: {index}</p>
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
      {voteCountLoading ? (
        <p>Loading votes...</p>
      ) : (
        <div className="flex gap-3 mt-3 justify-around p-3 border-t border-gray-200">
          <button
            disabled={voteMutation.isPending}
            onClick={handleLike}
            className="flex items-center gap-1"
          >
            <ThumbsUp
              className={`w-6 h-6 ${
                isLiked ? 'text-blue-600 fill-current' : 'text-gray-400'
              }`}
            />
            {voteCount?.data.upVoteCount}
          </button>

          <button
            disabled={voteMutation.isPending}
            onClick={handleDislike}
            className="flex items-center gap-1"
          >
            <ThumbsDown
              className={`w-6 h-6 ${
                isDisliked ? 'text-red-500 fill-current' : 'text-gray-400'
              }`}
            />
            {voteCount?.data.downVoteCount}
          </button>
        </div>
      )}

      {voteMutation.isPending && (
        <p className="text-sm text-gray-500 mt-2">Updating vote...</p>
      )}
    </div>
  );
}

export default SingleNote;
