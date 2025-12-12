import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { CompanyService } from './company_service.js'
import { createCompanyValidator, updateCompanyValidator } from './company_validator.js'

@inject()
export default class CompanysController {
  constructor(private CompanyService: CompanyService) {}

  async create({ auth, request, response }: HttpContext) {
    const user = auth.user

    if (!user || user.role !== 'admin') {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }
    const payload = await request.validateUsing(createCompanyValidator)
    const result = await this.CompanyService.createCompany(payload)

    return response.created(result)
  }

  async show({ params, response, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }

    const result = await this.CompanyService.getCompany(params.id)

    if (!result.success) return response.notFound(result)

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
    const result = await this.CompanyService.getCompanyList()

    if (!result.success) return response.notFound(result)

    return response.ok(result)
  }

  async update({ request, response, params, auth }: HttpContext) {
    const user = auth.user

    if (!user || user.companyId !== params.id) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }

    const payload = await request.validateUsing(updateCompanyValidator)
    const result = await this.CompanyService.updateCompany(payload, params.id)

    if (!result.success) return response.notFound(result)

    return response.ok(result)
  }

  async delete({ params, response, auth }: HttpContext) {
    const user = auth.user

    if (!user || user.companyId !== params.id) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }
    const result = await this.CompanyService.deleteCompany(params.id)

    if (!result.success) return response.notFound(result)

    return response.noContent()
  }
}
