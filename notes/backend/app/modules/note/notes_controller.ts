import { inject } from '@adonisjs/core';
import { NoteService } from './notes_service.js';
import type { HttpContext } from '@adonisjs/core/http';
import { createNoteValidator, updateNoteValidator } from './notes_validator.js';
import { Pagination } from '../../utils/types.js';
import { paginationValidator } from '../../validator/pagination_validator.js';

@inject()
export default class NotesController {
  constructor(private noteService: NoteService) {}

  async create({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createNoteValidator);

    const result = await this.noteService.createNote(payload, auth.user!);

    return response.created(result);
  }

  async show({ params, auth, response }: HttpContext) {
    const result = await this.noteService.getNote(params.id, auth.user!);

    return response.ok(result);
  }

  async getMyNoteList({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(paginationValidator);
    const pagination: Pagination = {
      page: Number(payload.page) ?? 1,
      limit: Number(payload.limit) ?? 10,
      sortBy: payload.sortBy ?? 'createdAt',
      orderBy: payload.orderBy ?? 'desc',
    };
    const type = request.input('type', 'all');

    const result = await this.noteService.getMyNoteList(
      auth.user!.id,
      type,
      pagination,
    );

    return response.ok(result);
  }

  async myNotes({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(paginationValidator);
    const pagination: Pagination = {
      page: Number(payload.page) ?? 1,
      limit: Number(payload.limit) ?? 10,
      sortBy: payload.sortBy ?? 'createdAt',
      orderBy: payload.orderBy ?? 'desc',
    };
    const type = request.input('type', 'all');

    const result = await this.noteService.getMyNoteList(
      auth.user!.id,
      type,
      pagination,
    );

    return response.ok(result);
  }

  async list({ response, auth }: HttpContext) {
    const result = await this.noteService.getNoteList(auth.user!.companyId);

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async update({ request, response, params, auth }: HttpContext) {
    const payload = await request.validateUsing(updateNoteValidator);

    const result = await this.noteService.updateNote(
      payload,
      params.id,
      auth.user!,
    );

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async delete({ params, response, auth }: HttpContext) {
    const result = await this.noteService.deleteNote(params.id, auth.user!);

    if (!result.success) return response.notFound(result);

    return response.noContent();
  }
}
