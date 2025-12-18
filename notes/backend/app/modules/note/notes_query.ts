import Note from '#models/note';
import VoteCount from '#models/vote_count';
import { DateTime } from 'luxon';
import { Pagination } from '../../utils/types.js';

export default class NoteRepository {
  async createNote(data: Partial<Note>) {
    const note = await Note.create(data);
    await VoteCount.create({
      noteId: note.id,
      upVoteCount: 0,
      downVoteCount: 0,
    });

    return {
      success: true,
      message: 'Note created successfully',
      data: note,
    };
  }

  async getMyNoteList(
    userId: number,
    type: 'public' | 'private' | 'all' = 'all',
    pagination?: Pagination,
  ) {
    const query = Note.query().where('user_id', userId);

    if(type !== 'all'){
      query.where('type', type)
    }

    const noteList = pagination
      ? await query
          .orderBy('created_at', 'desc')
          .paginate(pagination.page, pagination.limit)
      : await query;
    return {
      success: true,
      message: 'Note retrieved.',
      data: noteList,
    };
  }

  async getNote(id: number, workspaceIds: number[], userId: number) {
    const note = await Note.query()
      .where('id', id)
      .preload('user')
      .preload('workspace')
      .first();

    if (!note) {
      return {
        success: false,
        message: 'Note not found.',
      };
    }

    if (
      !workspaceIds.includes(note.workspaceId) ||
      (note.type === 'private' && note.userId !== userId)
    ) {
      return {
        success: false,
        message: 'Access denied to this note.',
      };
    }

    const voteCount = await VoteCount.findBy('note_id', note.id);

    return {
      success: true,
      message: 'Note retrieved.',
      data: { note, voteCount },
    };
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
