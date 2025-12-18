import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import { NoteHistoryService } from './note_history_service.js';

@inject()
export default class NoteHistorysController {
  constructor(private noteHistoryService: NoteHistoryService) {}

  async show({ params, response, auth }: HttpContext) {
    // show if the note belongs to this user
    const user = auth.user;

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      });
    }

    const result = await this.noteHistoryService.getNoteHistory(params.id);

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async list({ response, auth, params }: HttpContext) {
    // show if the note belongs to this user
    const user = auth.user;

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      });
    }
    const result = await this.noteHistoryService.getNoteHistoryList(
      user.id,
      params.id,
    );

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async delete({ params, response, auth }: HttpContext) {
    // delete if the note belongs to this user
    const user = auth.user;

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      });
    }
    const result = await this.noteHistoryService.deleteNoteHistory(params.id);

    if (!result.success) return response.notFound(result);

    return response.noContent();
  }
}
