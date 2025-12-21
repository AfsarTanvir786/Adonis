import { inject } from '@adonisjs/core';
import NoteVoteRepository from './note_votes_query.js';
import NoteRepository from '../note/notes_query.js';
import WorkspaceRepository from '../workspace/workspace_query.js';
import User from '#models/user';

@inject()
export default class NoteVoteService {
  constructor(
    private noteVoteRepository: NoteVoteRepository,
    private noteRepository: NoteRepository,
    private workspaceRepository: WorkspaceRepository,
  ) {}

  async createNoteVote(vote: 'up' | 'down', noteId: number, user: User) {
    const note = await this.noteRepository.getNoteForVote(noteId);
    if (!note) {
      console.log('1111');
      throw new Error('note does not exists');
    }

    const workspaceList = await this.workspaceRepository.getWorkspaceList(
      user.companyId,
    );
    const allowedWorkspaces = workspaceList.map((w) => w.id);
    if (!allowedWorkspaces || !allowedWorkspaces.includes(note.workspaceId)) {
      throw new Error('Access denied');
    }

    const noteVote = await this.noteVoteRepository.getVote(noteId, user.id);
    if (!noteVote) {
      return await this.noteVoteRepository.createNoteVote(
        vote,
        noteId,
        user.id,
      );
    } else if (noteVote.vote !== vote) {
      return await this.noteVoteRepository.updateNoteVote(vote, noteVote, note);
    }
    return noteVote;
  }

  async getVote(noteId: number, userId: number) {
    return await this.noteVoteRepository.getVote(noteId, userId);
  }

  async delete(noteId: number, userId: number) {
    try {
      return await this.noteVoteRepository.deleteNoteVote(noteId, userId);
    } catch (error) {
      throw new error('note vote delete error', error);
    }
  }
}
