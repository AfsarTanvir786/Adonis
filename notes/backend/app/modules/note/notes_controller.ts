import { inject } from '@adonisjs/core'
import { NoteService } from './notes_service.js'
import type { HttpContext } from '@adonisjs/core/http'
import { createNoteValidator, updateNoteValidator } from './notes_validator.js'

@inject()
export default class NotesController {
  constructor(private noteService: NoteService) {}

  async create({ auth, request, response }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }

    const companyId = await this.noteService.doesCompanyExist(user.companyId)
    if (!companyId) {
      return response.badRequest({
        success: false,
        message: 'Company does not exist',
      })
    }

    const payload = await request.validateUsing(createNoteValidator)
    console.log(payload);

    const workspaceIds = await this.noteService.getUserWorkspaceIds(user.companyId)

    if (workspaceIds.length === 0 || workspaceIds.indexOf(payload.workspaceId) === -1) {
      return response.unauthorized({
        success: false,
        message: 'Access denied to this workspace',
      })
    }

    const result = await this.noteService.createNote(payload, user.id)

    return response.created(result)
  }

  async show({ params, auth, response }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }

    const result = await this.noteService.getNote(params.id, user)

    if (!result.success) {
      return response.status(404).send(result)
    }
    return response.ok(result)
  }

  async list({ response, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }
    const result = await this.noteService.getNoteList(user.companyId)

    if (!result.success) return response.notFound(result)

    return response.ok(result)
  }

  async update({ request, response, params, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }
    const payload = await request.validateUsing(updateNoteValidator)

    const result = await this.noteService.updateNote(payload, params.id, user.id)

    if (!result.success) return response.notFound(result)

    return response.ok(result)
  }

  async delete({ params, response, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }
    const result = await this.noteService.deleteNote(params.id, user.id)

    if (!result.success) return response.notFound(result)

    return response.noContent()
  }
}
