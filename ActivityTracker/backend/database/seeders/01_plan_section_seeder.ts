import PlanSection from "#models/plan_section";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

export default class extends BaseSeeder {
  async run() {
    await PlanSection.updateOrCreateMany('name', [
      {
        name: 'Starter',
        costPerSeat: 5.0,
        description: 'Starter plan for small teams',
        isActive: true,
      },
      {
        name: 'Grow',
        costPerSeat: 10.0,
        description: 'Growing businesses',
        isActive: true,
      },
      {
        name: 'Team',
        costPerSeat: 10.0,
        description: 'Team collaboration plan',
        isActive: true,
      },
      {
        name: 'Enterprise',
        costPerSeat: 15.0,
        description: 'Enterprise-grade solution',
        isActive: true,
      },
    ])
  }
}
