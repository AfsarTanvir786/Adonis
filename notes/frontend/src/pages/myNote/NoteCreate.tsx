import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import {
  ArrowLeft,
  Save,
  Loader2,
  FileText,
  Lock,
  Globe,
  X,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { NoteService } from '@/services/api/noteService';
import { tagService } from '@/services/api/tagService';
import RequireLogin from '@/utils/requireLogin';
import { z } from 'zod';
import { useWorkspaceList } from '@/hooks/query/workspace/useWorkspaceList';

const createNoteSchema = z.object({
  workspaceId: z
    .string()
    .min(1, 'Workspace is required')
    .transform((val) => Number(val)),

  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(255, 'Title is too long'),

  content: z.string().trim().max(511, 'Content is too long').optional(),

  type: z.enum(['public', 'private']),

  isDraft: z.boolean(),

  tagIds: z.array(z.number()).optional(),
});

type CreateNoteInput = z.infer<typeof createNoteSchema>;

export default function NoteCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.authentication.user);

  if (!user || user.name === 'no user') {
    return <RequireLogin message="Please login to create your notes" />;
  }
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'private' as 'public' | 'private',
    isDraft: true,
    workspaceId: '',
    tagIds: [] as number[],
  });

  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  // Fetch workspaces
  const { data: workspaceList } = useWorkspaceList(user.companyId, {
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    orderBy: 'desc',
  });

  // Fetch tags
  const { data: tagsData } = useQuery({
    queryKey: ['tags'],
    queryFn: () => tagService.list(),
  });

  // Create note mutation
  const { mutate: createNote, isPending } = useMutation({
    mutationFn: (data: any) => NoteService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      navigate('/notes');
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
    setErrors({});

    const rawData = {
      ...formData,
      isDraft: !publish,
      tagIds: selectedTags,
    };

    const result = createNoteSchema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const validatedData: CreateNoteInput = result.data;

    createNote({
      ...validatedData,
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

  const workspaces = workspaceList?.data || [];
  const tags = tagsData?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/notes">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Note
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter note title..."
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">{errors.title}</p>
              )}
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
                placeholder="Write your note content here..."
              />
              {errors.content && (
                <p className="text-sm text-red-600 mt-1">{errors.content}</p>
              )}
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
                <option value="">Select a workspace</option>
                {workspaces.map((workspace: any) => (
                  <option key={workspace.id} value={workspace.id}>
                    {workspace.name}
                  </option>
                ))}
              </select>
              {errors.workspaceId && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.workspaceId}
                </p>
              )}
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
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      type: 'public',
                    })
                  }
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

            {/* Tags */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <button
                  type="button"
                  onClick={() => setShowTagInput(!showTagInput)}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  New Tag
                </button>
              </div>

              {/* Create New Tag */}
              {showTagInput && (
                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
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
              onClick={() => navigate('/notes')}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              disabled={isPending}
              className="border-gray-300"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Save as Draft
                </>
              )}
            </Button>
            <Button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Publish Note
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
