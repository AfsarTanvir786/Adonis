import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    for(let i=0; i<5; ++i){
      await User.create({
        name: faker.person.fullName(),
        companyId: Math.floor(Math.random() * 6) + 1,
        

      })
    }
  }
}