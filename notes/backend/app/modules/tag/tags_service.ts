import { inject } from '@adonisjs/core'
import TagRepository from './tags_query.js'
import Tag from '#models/tag'
@inject()
export class TagService {
  constructor(private tagRepository: TagRepository) {}

  async createTag(data: Partial<Tag>) {
    return this.tagRepository.createTag(data)
  }

  async getTag(id: number) {
    return this.tagRepository.getTag(id)
  }

  async updateTag(tag: Partial<Tag>, tagId: number) {
    return this.tagRepository.updateTag(tag, tagId)
  }

  async getTagList() {
    return this.tagRepository.getTagList()
  }

  async deleteTag(id: number) {
    return this.tagRepository.deleteTag(id)
  }
}
