import router from '@adonisjs/core/services/router';
import '../app/modules/auth/auth_route.ts'
import '../app/modules/company/company_route.js'
import '../app/modules/note/notes_route.js'
import '../app/modules/note_history/note_history_route.js'
import '../app/modules/note_vote/note_votes_route.js'
import '../app/modules/tag/tags_route.js'
import '../app/modules/workspace/workspace_route.js'

router.get('/', async () => {
  return {
    Project: 'Saas Notes Project',
  }
})

router.get('/a', async () => {
  return {
    Project: 'Saas Notes as Project',
  }
})