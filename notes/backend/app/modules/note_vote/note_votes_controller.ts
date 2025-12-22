import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import NoteVoteService from './note_votes_service.js';
import { noteVoteValidator } from './note_votes_validator.js';

@inject()
export default class NoteVoteController {
  constructor(private noteVoteService: NoteVoteService) {}
  async create({ auth, request, response, params }: HttpContext) {
    const payload = await request.validateUsing(noteVoteValidator);

    const result = await this.noteVoteService.createNoteVote(
      payload.vote,
      params.id,
      auth.user!,
    );

    return response.created(result);
  }

  async show({ response, params, auth }: HttpContext) {
    const result = await this.noteVoteService.getVote(params.id, auth.user!.id);

    return response.ok({
      success: true,
      message: 'get user voting',
      data: result,
    });
  }

  async destroy({ params, response, auth }: HttpContext) {
    await this.noteVoteService.delete(params.id, auth.user!.id);

    return response.ok({
      message: 'successfully delete note vote',
    });
  }
}
