import { inject } from '@adonisjs/core'
import User from '#models/user'
import Note from '#models/note'
import NoteRepository from './notes_query.js'
import Company from '#models/company'
import { DateTime } from 'luxon'

@inject()
export class NoteService {
  constructor(private NoteRepository: NoteRepository) {}

  async createNote(data: Partial<Note>, userId: number) {
    const notePayload = {
      ...data,
      userId: userId,
      workspaceId: data.workspaceId,
      publishedAt: Boolean(data.isDraft) ? DateTime.now() : null,
    }

    return this.NoteRepository.createNote(notePayload)
  }

  async getUserWorkspaceIds(companyId: number) {
    const workspaces = await Company.query().where('id', companyId).preload('workspaces').first()
    if (!workspaces) {
      return []
    }
    return workspaces.workspaces.map((workspace) => workspace.id)
  }

  async doesCompanyExist(companyId: number) {
    const company = await Company.query().where('id', companyId).first()
    return company ? companyId : null
  }

  async getNote(id: number, user: User) {
    const company = await this.doesCompanyExist(user.companyId)
    if (!company) {
      return {
        success: false,
        message: 'Company does not exist',
      }
    }

    const workspaceIds = await this.getUserWorkspaceIds(user.companyId)

    if (workspaceIds.length === 0) {
      return {
        success: false,
        message: 'No workspaces found for this company',
      }
    }

    return this.NoteRepository.getNote(id, workspaceIds, user.id)
  }

  async updateNote(note: Partial<Note>, id: number, userId: number) {
    return this.NoteRepository.updateNote(note, id, userId)
  }

  async getNoteList(workspaceId: number) {
    return this.NoteRepository.getNoteList(workspaceId)
  }

  async deleteNote(id: number, userId: number) {
    return this.NoteRepository.deleteNote(id, userId)
  }
}
