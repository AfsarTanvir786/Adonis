import type { Note } from '@/types/type';
import CanManage from '../note/canManage';

function SingleNote({ note }: { note: Note }) {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md p-4 border border-gray-200">
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
      <p>Updated By: {note.updatedBy}</p>
      <p>total count: {note.count}</p>

      <CanManage note={note} />
    </div>
  );
}

export default SingleNote;
