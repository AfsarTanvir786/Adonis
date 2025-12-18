import NoteVote from '#models/note_vote';

export default class NoteVoteRepository {
  async getNoteVote(noteId: number, userId: number) {
    const noteVote = await NoteVote.query()
      .where('noteId', noteId)
      .where('userId', userId)
      .first();

    return noteVote;
  }

  async getVote(noteId: number, userId: number) {
    const noteVote = await NoteVote.query()
      .where('note_id', noteId)
      .where('user_id', userId)
      .first();

    return noteVote;
  }
}
