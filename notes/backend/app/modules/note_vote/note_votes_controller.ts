import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import NoteVoteService from './note_votes_service.js'
import { createNoteVoteValidator } from './note_votes_validator.js'

@inject()
export default class NoteVoteController {
  constructor(private noteVoteService: NoteVoteService) {}

  async create({ auth, request, response, params }: HttpContext) {
    const payload = await request.validateUsing(createNoteVoteValidator)

    const result = await this.noteVoteService.addVote(payload.vote, params.id, auth.user!.id)

    if (!result.success) return response.notFound(result)

    return response.created({
      success: true,
      message: 'Sucessfully vote done.',
      data: result,
    })
  }

  async showTotalVoteCount({ response, params }: HttpContext) {
    const result = await this.noteVoteService.getVoteCount(params.id)

    if (!result) return response.notFound(result)

    return response.ok({
      success: true,
      message: 'voting successfully get',
      data: result,
    })
  }

  async show({response, params, auth}: HttpContext) {
    const result = await this.noteVoteService.getVote(params.id, auth.user!.id);

    return response.ok({
      success: true,
      message: 'get user voting',
      data: result,
    })
  }
}
