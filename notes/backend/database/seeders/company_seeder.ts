import Company from '#models/company'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    for(let i=0; i<5; ++i){
      await Company.create({
        name: faker.company.name()
      })
    }
  }
}