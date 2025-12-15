import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { ArrowLeft, Save, Loader2, Lock, Globe, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NoteService } from '@/services/api/noteService';
import { WorkspaceService } from '@/services/api/workspaceService';
import { tagService } from '@/services/api/tagService';

export default function NoteEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const user = useSelector((state: RootState) => state.authentication.user);
    if (!user) {
        <p>please login first</p>;
    }
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'private' as 'public' | 'private',
        isDraft: true,
        workspaceId: '',
    });

    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [showTagInput, setShowTagInput] = useState(false);
    const [newTagName, setNewTagName] = useState('');

    // Fetch note
    const { data: noteData, isLoading: isLoadingNote } = useQuery({
        queryKey: ['note', id],
        queryFn: () => NoteService.get(Number(id)),
    });

    // Fetch workspaces
    const { data: workspacesData } = useQuery({
        queryKey: ['workspaces'],
        queryFn: () => WorkspaceService.list(),
    });

    // Fetch tags
    const { data: tagsData } = useQuery({
        queryKey: ['tags'],
        queryFn: () => tagService.list(),
    });

    // Populate form when note is loaded
    useEffect(() => {
        if (noteData?.data) {
            const note = noteData.data;
            setFormData({
                title: note.title,
                content: note.content || '',
                type: note.type,
                isDraft: note.isDraft,
                workspaceId: note.workspaceId.toString(),
            });
            setSelectedTags(note.tags?.map((tag: any) => tag.id) || []);
        }
    }, [noteData]);

    // Update note mutation
    const { mutate: updateNote, isPending } = useMutation({
        mutationFn: (data: any) => NoteService.update(Number(id), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            queryClient.invalidateQueries({ queryKey: ['note', id] });
            navigate(`/notes/details/${id}`);
        },
    });

    // Create tag mutation
    const { mutate: createTag } = useMutation({
        mutationFn: (name: string) => tagService.create({ name }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
            setSelectedTags([...selectedTags, data.data.id]);
            setNewTagName('');
            setShowTagInput(false);
        },
    });

    const handleSubmit = (e: React.FormEvent, publish: boolean = false) => {
        e.preventDefault();

        updateNote({
            ...formData,
            isDraft: !publish,
            tagIds: selectedTags,
            publishedAt: publish ? new Date().toISOString() : null,
        });
    };

    const handleTagToggle = (tagId: number) => {
        setSelectedTags((prev) =>
            prev.includes(tagId)
                ? prev.filter((id) => id !== tagId)
                : [...prev, tagId]
        );
    };

    const handleCreateTag = () => {
        if (newTagName.trim()) {
            createTag(newTagName.trim());
        }
    };

    if (isLoadingNote) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const note = noteData?.data;
    const canEdit =
        user?.id === note?.userId ||
        user?.role === 'admin' ||
        user?.role === 'owner';

    if (!canEdit) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-red-600 mb-4">
                        You don't have permission to edit this note
                    </p>
                    <Button onClick={() => navigate('/notes')}>
                        Back to Notes
                    </Button>
                </div>
            </div>
        );
    }

    const workspaces = workspacesData?.data || [];
    const tags = tagsData?.data || [];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to={`/notes/${id}`}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Edit Note
                        </h1>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={(e) => handleSubmit(e, false)}
                    className="space-y-6"
                >
                    {/* Main Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        {/* Title */}
                        <div className="mb-6">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Title *
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Content */}
                        <div className="mb-6">
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Content
                            </label>
                            <textarea
                                id="content"
                                value={formData.content}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        content: e.target.value,
                                    })
                                }
                                rows={12}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Workspace Selection */}
                        <div className="mb-6">
                            <label
                                htmlFor="workspace"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Workspace *
                            </label>
                            <select
                                id="workspace"
                                value={formData.workspaceId}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        workspaceId: e.target.value,
                                    })
                                }
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {workspaces.map((workspace: any) => (
                                    <option
                                        key={workspace.id}
                                        value={workspace.id}
                                    >
                                        {workspace.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Type Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Visibility
                            </label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            type: 'private',
                                        })
                                    }
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg transition ${
                                        formData.type === 'private'
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    <Lock className="w-5 h-5" />
                                    <span className="font-medium">Private</span>
                                </button>
                                {/* <button
                  type */}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-medium text-gray-700">
                                    Tags
                                </label>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowTagInput(!showTagInput)
                                    }
                                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" />
                                    New Tag
                                </button>
                            </div>

                            {/* Create Ne<button
                  typew Tag */}
                            {showTagInput && (
                                <div className="mb-4 flex gap-2">
                                    <input
                                        type="text"
                                        value={newTagName}
                                        onChange={(e) =>
                                            setNewTagName(e.target.value)
                                        }
                                        placeholder="Tag name..."
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleCreateTag}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Create
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowTagInput(false);
                                            setNewTagName('');
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}

                            {/* Tag Selection */}
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag: any) => (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        onClick={() => handleTagToggle(tag.id)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                                            selectedTags.includes(tag.id)
                                                ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                                                : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:border-gray-300'
                                        }`}
                                    >
                                        {tag.name}
                                        {selectedTags.includes(tag.id) && (
                                            <X className="inline w-3 h-3 ml-1" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(`/notes/${id}`)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="outline"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                        {formData.isDraft && (
                            <Button
                                type="button"
                                onClick={(e) => handleSubmit(e, true)}
                                disabled={isPending}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {isPending ? 'Publishing...' : 'Publish Note'}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
