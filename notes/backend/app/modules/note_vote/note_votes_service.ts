import { inject } from '@adonisjs/core'
import NoteVoteRepository from './note_votes_query.js'

@inject()
export default class NoteVoteService {
  constructor(private noteVoteRepository: NoteVoteRepository) {}

  async addVote(vote: 'up' | 'down', noteId: number, userId: number) {
    // check if the noteId exist
    // is the note is public
    const noteVote = await this.noteVoteRepository.getNoteVote(noteId, userId)

    if (noteVote) {
      return await this.noteVoteRepository.updateNoteVote(noteVote, vote)
    }

    return await this.noteVoteRepository.createNoteVote(vote, noteId, userId)
  }
}
