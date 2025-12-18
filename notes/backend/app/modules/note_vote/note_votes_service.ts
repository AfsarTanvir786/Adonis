import { inject } from '@adonisjs/core';
import NoteVoteRepository from './note_votes_query.js';

@inject()
export default class NoteVoteService {
  constructor(private noteVoteRepository: NoteVoteRepository) {}

  async getVote(noteId: number, userId: number) {
    return await this.noteVoteRepository.getVote(noteId, userId);
  }
}
