import { inject } from "@adonisjs/core";
import type { HttpContext } from '@adonisjs/core/http'
import { DashboardService } from "./dashboard_service.js";

@inject()
export default class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  async index({ auth, response }: HttpContext) {
    const user = auth.user!

    const data = await this.dashboardService.getDashboard(user.companyId, user.id)
    return response.ok(data)
  }
}