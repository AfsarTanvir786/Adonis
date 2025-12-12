import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { TagService } from './tags_service.js'
import { createTagValidator, updateTagValidator } from './tags_validator.js'

@inject()
export default class TagsController {
  constructor(private tagService: TagService) {}

  async create({ auth, request, response }: HttpContext) {
    const user = auth.user

    if (!user || user.role !== 'admin') {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }
    const payload = await request.validateUsing(createTagValidator)

    const result = await this.tagService.createTag(payload)

    return response.created(result)
  }

  async show({ params, response }: HttpContext) {

    const result = await this.tagService.getTag(params.id)

    if (!result.success) return response.notFound(result)
    return response.ok(result)
  }

  async list({ response }: HttpContext) {
    const result = await this.tagService.getTagList()

    if (!result.success) return response.notFound(result)
    return response.ok(result)
  }

  async update({ request, response, params, auth }: HttpContext) {
    const user = auth.user

    if (!user || user.role !== 'admin') {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }
    const payload = await request.validateUsing(updateTagValidator)

    const result = await this.tagService.updateTag(payload, params.id)

    if (!result.success) return response.notFound(result)

    return response.ok(result)
  }

  async delete({ params, response, auth }: HttpContext) {
    const user = auth.user

    if (!user || user.role !== 'admin') {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }
    const result = await this.tagService.deleteTag(params.id)

    if (!result.success) return response.notFound(result)

    return response.noContent()
  }
}
