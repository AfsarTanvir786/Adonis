import { useNoteVote } from '@/hooks/query/note_vote/useNoteVote';
import { useNoteVoteDelete } from '@/hooks/query/note_vote/useNoteVoteDelete';
import type { RootState } from '@/store';
import type { Note } from '@/types/type';
import RequireLogin from '@/utils/requireLogin';
import { ArrowDownFromLine, ArrowUpFromLine } from 'lucide-react';
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

  const voteMutation = useNoteVote(note.id);
  const voteDelete = useNoteVoteDelete();
  const votes = note.votes ? note.votes[0] : null;
  const isLiked = votes?.vote === 'up';
  const isDisliked = votes?.vote === 'down';

  const handleLikes = (vote: 'up' | 'down') => {
    if(vote === 'up' && isLiked || vote=== 'down' && isDisliked){
      voteDelete.mutate(note.id);
    }else if(vote === 'up'){
      voteMutation.mutate('up');
    }else{
      voteMutation.mutate('down');
    }
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
      <div className="flex gap-3 mt-3">
        <button
          disabled={voteMutation.isPending}
          onClick={() => handleLikes('up')}
          className="flex items-center gap-1"
        >
          <ArrowUpFromLine
            className={`w-6 h-6 ${
              isLiked ? 'text-blue-600 fill-current' : 'text-gray-400'
            }`}
          />
        </button>
        {note.count}
        <button
          disabled={voteMutation.isPending}
          onClick={() => handleLikes('down')}
          className="flex items-center gap-1"
        >
          <ArrowDownFromLine
            className={`w-6 h-6 ${
              isDisliked ? 'text-red-500 fill-current' : 'text-gray-400'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default SingleNote;
