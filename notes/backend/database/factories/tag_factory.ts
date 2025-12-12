import Factory from '@adonisjs/lucid/factories'
import Tag from '#models/tag'

export default Factory.define(Tag, ({ faker }) => {
  return {
    name: faker.helpers.arrayElement([
      'javascript',
      'typescript',
      'python',
      'java',
      'csharp',
      'php',
      'ruby',
      'go',
      'rust',
      'swift',
      'kotlin',
      'backend',
      'frontend',
      'fullstack',
      'database',
      'api',
      'rest',
      'graphql',
      'microservices',
      'devops',
      'cloud',
      'aws',
      'azure',
      'docker',
      'kubernetes',
    ]),
  }
}).build()