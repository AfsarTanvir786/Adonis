import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { ArrowLeft, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RequireLogin from '@/utils/requireLogin';
import { useNoteUpdate } from '@/hooks/query/my_note/useNoteUpdate';
import { useHistoryGet } from '@/hooks/query/my_note_history/useHistoryGet';
import { useWorkspaceList } from '@/hooks/query/workspace/useWorkspaceList';

export default function HistoryEdit() {
  const { id, id2 } = useParams<{ id: string; id2: string }>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authentication.user);

  if (!user || user.name === 'no user') {
    return (
      <RequireLogin message="You don't have permission to edit this note." />
    );
  }
  const [formData, setFormData] = useState({
    id: -1,
    noteId: -1,
    title: '',
    content: '',
    type: 'private' as 'public' | 'private',
    isDraft: true,
    workspaceId: 0,
    publishedAt: '' as any,
  });

  // Fetch note
  const { data: noteData, isLoading: isLoadingNote } = useHistoryGet(Number(id2));

  // Fetch workspaces
  const { data: workspaceList } = useWorkspaceList(user.companyId)

  // Populate form when note is loaded
  useEffect(() => {
    if (noteData) {
      const note = noteData;
      setFormData({
        id: note.id,
        workspaceId: note.workspaceId,
        noteId: note.noteId,
        title: note.oldTitle,
        content: note.oldContent || '',
        isDraft: note.oldIsDraft,
        type: note.oldType,
        publishedAt: note.oldPublishedAt
      });
    }
  }, [noteData]);

  // Update note mutation
  const { mutate: updateNote, isPending } = useNoteUpdate(
    Number(id),
    user.id,
    formData
  );

  const handleSubmit = (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();
    formData.isDraft = !publish;
    updateNote();
  };

  if (isLoadingNote) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const note = noteData;
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
          <Button onClick={() => navigate('/notes')}>Back to Notes</Button>
        </div>
      </div>
    );
  }

  const workspaces = workspaceList || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <p>pages/myNote/history/HistoryEdit.tsx</p>

      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={`/notes`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Restore the note
            </h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
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
                required
                disabled
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
                disabled
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
                    workspaceId: Number(e.target.value),
                  })
                }
                required
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {workspaces.map((workspace: any) => (
                  <option key={workspace.id} value={workspace.id}>
                    {workspace.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Visibility
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                disabled
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg transition ${
                  formData.type === 'private'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Lock className="w-5 h-5" />
                <span className="font-medium">Private</span>
              </button>
              <button
                type="button"
                disabled
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg transition ${
                  formData.type === 'public'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium">Public</span>
              </button>
            </div>
          </div>

          {/* is draft buttons */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Is Published
            </label>
            <p className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              {formData.isDraft ? 'No' : 'Yes'}
            </p>
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
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? 'Restoring...' : 'Restore Note'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
