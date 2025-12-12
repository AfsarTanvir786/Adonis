import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import NoteVoteService from './note_votes_service.js'

@inject()
export default class NoteVoteController {
  constructor(private noteVoteService: NoteVoteService) {}

  async create({ auth, request, response }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({
        sucess: false,
        message: 'Not authenticated',
      })
    }

    const payload = request.only(['vote', 'noteId'])

    const result = await this.noteVoteService.addVote(payload.vote, payload.noteId, user.id)

    if (!result.success) return response.notFound(result)

    return {
      success: true,
      message: 'Sucessfully vote done.',
      data: result,
    }
  }
}
