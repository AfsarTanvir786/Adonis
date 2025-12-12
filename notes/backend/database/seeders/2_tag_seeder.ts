import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Tag from '#models/tag'

export default class TagSeeder extends BaseSeeder {
  async run() {
    await Tag.updateOrCreateMany('name', [
      { name: 'javascript' },
      { name: 'typescript' },
      { name: 'python' },
      { name: 'backend' },
      { name: 'frontend' },
      { name: 'fullstack' },
      { name: 'database' },
      { name: 'adonisjs' },
      { name: 'api' },
      { name: 'rest' },
      { name: 'graphql' },
      { name: 'design' },
      { name: 'devops' },
      { name: 'cloud' },
      { name: 'docker' },
    ])
  }
}