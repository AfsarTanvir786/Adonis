import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import NoteVoteService from './note_votes_service.js';

@inject()
export default class NoteVoteController {
  constructor(private noteVoteService: NoteVoteService) {}

  async show({ response, params, auth }: HttpContext) {
    const result = await this.noteVoteService.getVote(params.id, auth.user!.id);

    return response.ok({
      success: true,
      message: 'get user voting',
      data: result,
    });
  }
}
