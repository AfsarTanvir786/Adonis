import type { RootState } from '@/store';
import type { Note } from '@/types/type';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SingleNote({ note, canManage }: { note: Note; canManage: boolean }) {
    const user = useSelector((state: RootState) => state.authentication.user);
    if(!user){
        <p>login please</p>;
    }
    return (
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
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
            <p>creator id: {note.userId}</p>
            <p>Workspace id: {note.workspaceId}</p>
            <p>User Id: {note.userId}</p>

            {canManage && (
                <div className="mt-4 flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md shadow">
                        <Link to={`/notes/edit/${note.id}`} state={canManage}>
                            Edit
                        </Link>
                    </button>

                    <button className="bg-white hover:bg-lime-200 text-black px-3 py-1.5 rounded-md shadow">
                        <Link
                            to={`/notes/details/${note.id}`}
                            state={canManage}
                        >
                            Details
                        </Link>
                    </button>
                </div>
            )}
        </div>
    );
}

export default SingleNote;
