import { inject } from '@adonisjs/core'
import User from '#models/user'
import Note from '#models/note'
import NoteRepository from './notes_query.js'
import { DateTime } from 'luxon'
import WorkspaceRepository from '../workspace/workspace_query.js'
import CompanyRepository from '../company/company_query.js'

@inject()
export class NoteService {
  constructor(
    private noteRepository: NoteRepository,
    private workspaceRepository: WorkspaceRepository,
    private companyRepository: CompanyRepository
  ) {}

  async createNote(data: Partial<Note>, user: User) {
    const company = await this.companyRepository.getCompany(user.companyId)
    if (!company.success) {
      return company
    }

    const workspaceList = await this.workspaceRepository.getWorkspaceList(user.companyId)
    const allowedWorkspaces = workspaceList.data.map((w) => w.id)

    if (allowedWorkspaces.length === 0) {
      return {
        success: false,
        message: 'No workspaces found for this company',
      }
    }

    if (data.workspaceId && !allowedWorkspaces.includes(data.workspaceId)) {
      return {
        success: false,
        message: 'Workspace does not belong to your company',
      }
    }

    const notePayload = {
      ...data,
      userId: user.id,
      workspaceId: data.workspaceId,
      publishedAt: Boolean(data.isDraft) ? DateTime.now() : null,
    }

    return this.noteRepository.createNote(notePayload)
  }

  async getMyNoteList(userId: number) {
    return await this.noteRepository.getMyNoteList(userId)
  }

  async getNote(id: number, user: User) {
    const company = await this.companyRepository.getCompany(user.companyId)
    if (!company.success) {
      return company
    }

    const workspaceList = await this.workspaceRepository.getWorkspaceList(user.companyId)
    if (workspaceList.data.length === 0) {
      return {
        success: false,
        message: 'No workspaces found for this company',
      }
    }
    const workspaceIds = workspaceList.data.map((w) => w.id)

    return this.noteRepository.getNote(id, workspaceIds, user.id)
  }

  async updateNote(note: Partial<Note>, id: number, userId: number) {
    return this.noteRepository.updateNote(note, id, userId)
  }

  async getNoteList(companyId: number) {
    const workspaceList = await this.workspaceRepository.getWorkspaceList(companyId)
    if (workspaceList.data.length === 0) {
      return {
        success: false,
        message: 'No workspaces found for this company',
      }
    }
    const workspaceIds = workspaceList.data.map((w) => w.id)
    return this.noteRepository.getNoteList(workspaceIds)
  }

  async deleteNote(id: number, userId: number) {
    return this.noteRepository.deleteNote(id, userId)
  }
}
