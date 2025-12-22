import Note from '#models/note';
import { DateTime } from 'luxon';
import { Pagination } from '../../utils/types.js';

export default class NoteRepository {
  async createNote(data: Partial<Note>) {
    return await Note.create({
      ...data,
      publishedAt: data.isDraft ? null : DateTime.now(),
      count: 0,
    });
  }

  async paginatePublicNotes(
    workspaceId: number,
    pagination: Pagination,
    userId: number,
  ) {
    const sortColumn =
      pagination.sortBy === 'name' ? 'title' : pagination.sortBy;

    return await Note.query()
      .where('workspace_id', workspaceId)
      .where('type', 'public')
      .where('is_draft', false)
      .preload('votes', (v) => v.where('user_id', userId).first)
      .orderBy(sortColumn, pagination.orderBy)
      .paginate(pagination.page, pagination.limit);
  }

  async getMyNoteList(
    userId: number,
    type: 'public' | 'private' | 'all' = 'all',
    pagination: Pagination,
  ) {
    const sortColumn =
      pagination.sortBy === 'name' ? 'title' : pagination.sortBy;
    const query = Note.query().where('user_id', userId);

    if (type !== 'all') {
      query.where('type', type);
    }

    const noteList = await query
      .orderBy(sortColumn, pagination.orderBy)
      .paginate(pagination.page, pagination.limit);

    return noteList;
  }

  async getNote(id: number, workspaceIds: number[], userId: number) {
    const note = await Note.query()
      .where('id', id)
      .preload('user')
      .preload('workspace')
      .first();

    if (
      note &&
      (!workspaceIds.includes(note.workspaceId) ||
        (note.type === 'private' && note.userId !== userId))
    ) {
      return {
        message: 'Access denied to this note.',
      };
    }

    return note;
  }

  async getNoteForVote(id: number) {
    const note = await Note.query()
      .where('id', id)
      .where('type', 'public')
      .first();

    return note;
  }

  async updateNote(data: Partial<Note>, id: number, userId: number) {
    const note = await Note.find(id);

    if (!note) {
      return {
        success: false,
        message: 'Note not found.',
      };
    }

    if (note.userId !== userId) {
      return {
        success: false,
        message: 'Access denied to this note.',
      };
    }

    note.merge({
      workspaceId: data.workspaceId ?? data.workspaceId,
      title: data.title ?? note.title,
      content: data.content ?? note.content,
      type: data.type ?? note.type,
      isDraft: data.isDraft ?? note.isDraft,
      publishedAt: (data.isDraft ?? note.isDraft) ? null : DateTime.now(),
    });

    await note.save();

    return {
      success: true,
      message: 'Note updated successfully.',
      data: note,
    };
  }

  async getNoteList(workspaceIds: number[]) {
    const list = await Note.query()
      .whereIn('workspace_id', workspaceIds)
      .where('type', 'public')
      .where('is_draft', 0);

    return {
      success: true,
      data: list,
    };
  }

  async deleteNote(id: number, userId: number) {
    const note = await Note.find(id);

    if (!note) {
      return {
        success: false,
        message: 'Note not found.',
      };
    }

    if (note.userId !== userId) {
      return {
        success: false,
        message: 'Access denied to this note.',
      };
    }

    await note.delete();

    return {
      success: true,
      message: 'Note deleted successfully.',
    };
  }
}
