import Note from '#models/note';
import NoteVote from '#models/note_vote';

export default class NoteVoteRepository {
  async createNoteVote(vote: 'up' | 'down', noteId: number, userId: number) {
    const note = await Note.find(noteId);
    if (!note) {
      throw new Error('note does not exists');
    }

    const noteVote = await NoteVote.create({
      userId: userId,
      noteId: noteId,
      vote: vote,
    });
    note.count += 'up' === vote ? 1 : -1;
    await note.save();
    return noteVote;
  }

  async updateNoteVote(vote: 'up' | 'down', noteVote: NoteVote, note: Note) {
    if (vote !== noteVote.vote) {
      if (vote === 'up') note.count += 2;
      else note.count -= 2;
    }

    noteVote.merge({
      vote: vote,
    });

    await noteVote.save();
    await note.save();
    return noteVote;
  }

  async deleteNoteVote(noteId: number, userId: number) {
    const note = await Note.find(noteId);
    const noteVote = await NoteVote.query()
      .where('note_id', noteId)
      .where('user_id', userId)
      .first();

    if (!note) {
      throw new Error('note does not exists');
    }
    if (!noteVote) {
      throw new Error('access denied');
    }

    note.count += 'up' === noteVote.vote ? -1 : 1;
    await note.save();
    await noteVote.delete();
  }

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
      .preload('note')
      .first();

    return noteVote;
  }
}
