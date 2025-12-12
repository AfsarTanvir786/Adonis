import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Workspace from '#models/workspace'
import User from '#models/user'
import Note from '#models/note'
import Tag from '#models/tag'
import { DateTime } from 'luxon'

export default class NoteSeeder extends BaseSeeder {
  async run() {
    try {
      console.log('🔍 Starting note seeder...')

      // Check workspaces
      const workspaces = await Workspace.all()
      console.log(`Found ${workspaces.length} workspaces`)

      if (workspaces.length === 0) {
        console.error('❌ No workspaces found! Run workspace seeder first.')
        return
      }

      // Check tags
      const allTags = await Tag.all()
      console.log(`Found ${allTags.length} tags`)

      if (allTags.length === 0) {
        console.error('❌ No tags found! Run tag seeder first.')
        return
      }

      // Check users
      const allUsers = await User.all()
      console.log(`Found ${allUsers.length} users`)

      let totalCreated = 0

      for (const workspace of workspaces) {
        console.log(`\n📝 Processing workspace: ${workspace.name} (ID: ${workspace.id})`)

        // Get users from the same company
        const companyUsers = await User.query().where('company_id', workspace.companyId)

        console.log(`  Found ${companyUsers.length} users in company ${workspace.companyId}`)

        if (companyUsers.length === 0) {
          console.log(`  ⚠️  No users found for company ${workspace.companyId}, skipping...`)
          continue
        }

        // Create 5 notes per user
        for (const user of companyUsers.slice(0, 3)) {
          // Limit to 3 users per workspace
          console.log(`  👤 Creating notes for user: ${user.name || user.email} (ID: ${user.id})`)

          for (let i = 0; i < 5; i++) {
            try {
              const isDraft = i === 0 // First note is a draft

              const noteData: Partial<Note> = {
                workspaceId: workspace.id,
                userId: user.id,
                title: this.getTitles()[i % this.getTitles().length],
                content: this.getContent(),
                type: i % 2 === 0 ? 'public' : 'private',
                isDraft: isDraft,
                publishedAt: isDraft ? null : DateTime.now().minus({ days: i }),
              }

              console.log(`    Creating note: ${noteData.title}`)

              const note = await Note.create(noteData)

              console.log(`    ✅ Note created with ID: ${note.id}`)

              // Attach random tags
              const tagCount = Math.floor(Math.random() * 3) + 2 // 2-4 tags
              const randomTags = this.getRandomItems(allTags, tagCount)
              const tagIds = randomTags.map((t) => t.id)

              console.log(
                `    🏷️  Attaching ${tagIds.length} tags: ${randomTags.map((t) => t.name).join(', ')}`
              )

              await note.related('tags').attach(tagIds)

              console.log(`    ✅ Tags attached`)

              totalCreated++
            } catch (noteError) {
              console.error(`    ❌ Error creating note:`, noteError.message)
              console.error(noteError)
            }
          }
        }
      }

      console.log(`\n✅ Total notes created: ${totalCreated}`)

      // Verify
      const noteCount = await Note.query().count('* as total')
      console.log(`📊 Notes in database: ${noteCount[0].$extras.total}`)
    } catch (error) {
      console.error('❌ Fatal error in note seeder:', error.message)
      console.error(error)
      throw error
    }
  }

  private getTitles(): string[] {
    return [
      'Getting Started with TypeScript',
      'Best Practices for API Design',
      'Database Optimization Techniques',
      'Understanding Async/Await',
      'Docker Container Best Practices',
      'RESTful API Design Principles',
      'Authentication Guide',
      'Microservices Architecture',
      'Frontend Performance Tips',
      'Backend Security Essentials',
    ]
  }

  private getContent(): string {
    return `This is a detailed note about the topic. It contains important information and best practices.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
  }

  private getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(count, array.length))
  }
}