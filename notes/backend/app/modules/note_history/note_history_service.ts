import NoteHistory from '#models/note_history'
import { inject } from '@adonisjs/core'
import NoteHistoryRepository from './note_history_query.js'

@inject()
export class NoteHistoryService {
  constructor(private noteHistoryRepository: NoteHistoryRepository) {}

  async createNoteHistory(data: Partial<NoteHistory>) {
    return this.noteHistoryRepository.createNoteHistory(data)
  }

  async getNoteHistory(id: number) {
    return this.noteHistoryRepository.getNoteHistory(id)
  }

  async getNoteHistoryList(userId: number, noteId: number) {
    return this.noteHistoryRepository.getNoteHistoryList(userId, noteId)
  }

  async deleteNoteHistory(id: number) {
    return this.noteHistoryRepository.deleteNoteHistory(id)
  }
}
