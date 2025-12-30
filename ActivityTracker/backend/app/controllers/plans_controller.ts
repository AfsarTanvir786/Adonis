import PlanSection from '#models/plan_section';
import type { HttpContext } from '@adonisjs/core/http';

export default class PlansController {
  async show({ response }: HttpContext) {
    try {
      const plan = await PlanSection.query()
        .select('id', 'name', 'cost_per_seat', 'description')
        .where('is_active', true);

      return response.ok({
        data: plan,
      });
    } catch (error) {
      return response.badRequest({
        error: 'Something went wrong',
        details: error.messages || error.message,
      });
    }
  }
}
