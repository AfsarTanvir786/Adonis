import { Button } from '@/components/ui/button';
import { NoteService } from '@/services/api/noteService';
import type { RootState } from '@/store';
import type { Note } from '@/types/type';
import RequireLogin from '@/utils/requireLogin';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function NoteDelete({
    note,
    canManage,
}: {
    note: Note;
    canManage: boolean;
}) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const user = useSelector((state: RootState) => state.authentication.user);

    if (!user || user.name === 'no user') {
        return (
            <RequireLogin message="You don't have permission to delete this note." />
        );
    }
    if (!(canManage || note.userId === user.id)) {
        return <p>Unauthorised</p>;
    }
    // Fetch note details
    const {
        data: noteData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['note', note.id],
        queryFn: () => NoteService.get(note.id),
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading note...</p>
                </div>
            </div>
        );
    }

    if (isError || !noteData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Failed to load note</p>
                    <Button onClick={() => navigate('/notes')}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Notes
                    </Button>
                </div>
            </div>
        );
    }
    // Delete mutation
    const { mutate: deleteNote, isPending: isDeleting } = useMutation({
        mutationFn: () => NoteService.delete(note.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            // navigate('/notes');
        },
    });
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            deleteNote();
        }
    };
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

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                    <button className="bg-white hover:bg-lime-200 text-black px-3 py-1.5 rounded-md shadow">
                        <Link
                            to={`/notes/details/${note.id}`}
                            state={canManage}
                        >
                            details
                        </Link>
                    </button>
                </div>
            )}
        </div>
    );
}
