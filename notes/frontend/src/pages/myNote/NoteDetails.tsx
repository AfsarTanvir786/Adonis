import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import {
    ArrowLeft,
    Edit,
    Trash2,
    Globe,
    Lock,
    Calendar,
    User,
    Folder,
    Tag as TagIcon,
    ThumbsUp,
    ThumbsDown,
    History,
    NewspaperIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NoteService } from '@/services/api/noteService';
import { format } from 'date-fns';
import RequireLogin from '@/utils/requireLogin';

export default function NoteDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const user = useSelector((state: RootState) => state.authentication.user);

    if (!user || user.name === 'no user') {
        return (
            <RequireLogin message="Please login to view your note details" />
        );
    }

    // Fetch note details
    const {
        data: noteData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['note', id],
        queryFn: () => NoteService.get(Number(id)),
    });

    // Delete mutation
    const { mutate: deleteNote, isPending: isDeleting } = useMutation({
        mutationFn: () => NoteService.delete(Number(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            navigate('/notes');
        },
    });

    // Vote mutation
    const { mutate: vote } = useMutation({
        mutationFn: (voteType: 'up' | 'down') =>
            NoteService.vote(Number(id), voteType),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['note', id] });
        },
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

    if (isError || !noteData || !noteData.data) {
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

    const {note, voteCount} = noteData.data;
    if (!note) {
        return <p>This is invalid Note.</p>;
    }
    const canEdit =
        user?.id === note.userId ||
        user?.role === 'admin' ||
        user?.role === 'owner';

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            deleteNote();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <Link to="/notes">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </Link>

                    {canEdit && (
                        <div className="flex gap-2">
                            <Link to={`/notes/edit/${note.id}`}>
                                <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                            </Link>
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
                        </div>
                    )}
                </div>

                {/* Note Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Title & Meta */}
                    <div className="p-8 border-b border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                            <h1 className="text-4xl font-bold text-gray-900">
                                {note.title}
                            </h1>
                            <div className="flex items-center gap-2">
                                {note.type === 'public' ? (
                                    <>
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                            <Globe className="w-4 h-4" />
                                            Public
                                        </span>
                                        {note.isDraft && (
                                            <>
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                                    <NewspaperIcon className="w-4 h-4" />
                                                    Published
                                                </span>
                                                {voteCount && (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                            <ThumbsUp />
                                                            {
                                                                voteCount.upVoteCount
                                                            }
                                                        </span>
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                            <ThumbsDown />
                                                            {
                                                                voteCount.downVoteCount
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                        <Lock className="w-4 h-4" />
                                        Private
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>
                                    {note.user?.name || note.user?.email}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Folder className="w-4 h-4" />
                                <span>{note.workspace?.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    {note.publishedAt
                                        ? format(
                                              note.publishedAt,
                                              'MMM dd, yyyy'
                                          )
                                        : 'Not published'}
                                </span>
                            </div>
                        </div>

                        {/* Tags */}
                        {note.tags && note.tags.length > 0 && (
                            <div className="mt-4 flex items-center gap-2 flex-wrap">
                                <TagIcon className="w-4 h-4 text-gray-400" />
                                {note.tags.map((tag: any) => (
                                    <span
                                        key={tag.id}
                                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <div className="prose max-w-none">
                            {note.content ? (
                                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                    {note.content}
                                </div>
                            ) : (
                                <p className="text-gray-400 italic">
                                    No content available
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Voting (for public notes) */}
                    {note.type === 'public' && !note.isDraft && (
                        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">
                                    Was this helpful?
                                </span>
                                <button
                                    onClick={() => vote('up')}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white hover:border-green-500 hover:text-green-600 transition"
                                >
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-sm">Helpful</span>
                                </button>
                                <button
                                    onClick={() => vote('down')}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white hover:border-red-500 hover:text-red-600 transition"
                                >
                                    <ThumbsDown className="w-4 h-4" />
                                    <span className="text-sm">Not Helpful</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* History Link */}
                    {canEdit && (
                        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                            <Link
                                to={`/notes/${note.id}/history`}
                                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                            >
                                <History className="w-4 h-4" />
                                View Edit History
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
