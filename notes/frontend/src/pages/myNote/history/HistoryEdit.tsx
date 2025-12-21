import { useHistoryGet } from '@/hooks/query/my_note_history/useHistoryGet';
import { useWorkspaceList } from '@/hooks/query/workspace/useWorkspaceList';
import type { RootState } from '@/store';
import RequireLogin from '@/utils/requireLogin';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'

function HistoryEdit() {
    const {id, id2} = useParams<{id: string, id2: string}>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.authentication.user);

  if (!user || user.name === 'no user') {
    return (
      <RequireLogin message="You don't have permission to edit this note." />
    );
  }
    const [formData, setFormData] = useState({
      title: '',
      content: '',
      type: 'private' as 'public' | 'private',
      isDraft: true,
      workspaceId: 0,
    });

const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTagName, setNewTagName] = useState('');

    const { data: noteData, isLoading: isLoadingNote } = useHistoryGet(
      Number(id),
      user.id
    );

      // Fetch workspaces
      const { data: workspaceList } = useWorkspaceList(user.companyId, {
        page: 1,
        limit: 20,
        sortBy: 'createdAt',
        orderBy: 'desc',
      });

  return (
    <div>HistoryEdit</div>
  )
}

export default HistoryEdit