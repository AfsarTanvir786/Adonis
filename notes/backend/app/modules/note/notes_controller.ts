import { inject } from '@adonisjs/core'
import { NoteService } from './notes_service.js'
import type { HttpContext } from '@adonisjs/core/http'
import { createNoteValidator, updateNoteValidator } from './notes_validator.js'

@inject()
export default class NotesController {
  constructor(private noteService: NoteService) {}

  async create({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createNoteValidator)

    const result = await this.noteService.createNote(payload, auth.user!)

    return response.created(result)
  }

  async show({ params, auth, response }: HttpContext) {
    const result = await this.noteService.getNote(params.id, auth.user!)

    if (!result.success) {
      return response.status(404).send(result)
    }
    return response.ok(result)
  }

  async getMyNoteList({ response, auth }: HttpContext) {
    const result = await this.noteService.getMyNoteList(auth.user!.id)
    if (!result.success) return response.notFound(result)

    return response.ok(result)
  }

  async list({ response, auth }: HttpContext) {
    const result = await this.noteService.getNoteList(auth.user!.companyId)

    if (!result.success) return response.notFound(result)

    return response.ok(result)
  }

  async update({ request, response, params, auth }: HttpContext) {
    const payload = await request.validateUsing(updateNoteValidator)

    const result = await this.noteService.updateNote(payload, params.id, auth.user!.id)

    if (!result.success) return response.notFound(result)

    return response.ok(result)
  }

  async delete({ params, response, auth }: HttpContext) {
    const result = await this.noteService.deleteNote(params.id, auth.user!.id)

    if (!result.success) return response.notFound(result)

    return response.noContent()
  }
}
