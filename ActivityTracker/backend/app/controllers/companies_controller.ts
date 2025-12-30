import Company from '#models/company';
import User from '#models/user';
import { companySignupValidator } from '#validators/company';
import type { HttpContext } from '@adonisjs/core/http';

export default class CompaniesController {
  async signUp({ request, response }: HttpContext) {
    const payload = await request.validateUsing(companySignupValidator);
    try {
      const company = await Company.create({
        name: payload.companyName,
        ownerName: payload.ownerName,
        ownerEmail: payload.ownerEmail,
        planSectionId: payload.planSectionId,
        isActive: true,
      });

      const user = await User.create({
        name: payload.ownerName,
        email: payload.ownerEmail,
        isActive: true,
        role: 'admin',
        password: payload.password,
        companyId: company.id,
      });

      return response.created({
        message: 'Company registered successfully',
        data: {
          user: user,
          company: company,
        },
      });
    } catch (error) {
      return response.badRequest({
        error: 'Signup failed',
        details: error.messages || error.message,
      });
    }
  }
}
