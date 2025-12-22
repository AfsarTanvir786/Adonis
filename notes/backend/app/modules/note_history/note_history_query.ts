import NoteHistory from '#models/note_history';

export default class NoteHistoryRepository {
  async createNoteHistory(data: Partial<NoteHistory>) {
    const noteHistory = await NoteHistory.create(data);

    return {
      success: true,
      message: 'NoteHistory created successfully',
      data: noteHistory,
    };
  }

  async getNoteHistory(id: number) {
    const noteHistory = await NoteHistory.query().where('id', id).first();

    return noteHistory;
  }

  async getNoteHistoryList(userId: number, noteId: number) {
    const list: NoteHistory[] = await NoteHistory.query()
      .where('noteId', noteId)
      .where('userId', userId);

    return {
      success: true,
      message: 'Note History found.',
      data: list,
    };
  }

  async deleteNoteHistory(id: number) {
    const noteHistory = await NoteHistory.find(id);

    if (!noteHistory) {
      return {
        success: false,
        message: 'Note History not found.',
      };
    }

    await noteHistory.delete();

    return {
      success: true,
      message: 'Note History deleted successfully.',
    };
  }
}
