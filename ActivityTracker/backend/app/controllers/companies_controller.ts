import Company from '#models/company';
import User from '#models/user';
import { companySignupValidator } from '#validators/company';
import type { HttpContext } from '@adonisjs/core/http';
import db from '@adonisjs/lucid/services/db';

export default class CompaniesController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(companySignupValidator);

    const trx = await db.transaction();

    try {
      const company = await Company.create(
        {
          name: payload.companyName,
          ownerName: payload.ownerName,
          ownerEmail: payload.ownerEmail,
          planSectionId: payload.planSectionId,
          isActive: true,
        },
        { client: trx },
      );

      const user = await User.create(
        {
          name: payload.ownerName,
          email: payload.ownerEmail,
          isActive: true,
          role: 'admin',
          password: payload.password,
          companyId: company.id,
        },
        { client: trx },
      );

      await trx.commit();

      return response.created({
        message: 'Company registered successfully',
        data: {
          user: user,
          company: company,
        },
      });
    } catch (error) {
      await trx.rollback();
      return response.badRequest({
        error: 'Signup failed',
        details: error.messages || error.message,
      });
    }
  }
}
