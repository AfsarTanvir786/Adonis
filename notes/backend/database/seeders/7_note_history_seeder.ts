import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Note from '#models/note';
import NoteHistory from '#models/note_history';

export default class NoteHistorySeeder extends BaseSeeder {
  async run() {
    const notes = await Note.query().where('is_draft', false).limit(20);

    console.log(`Creating history for ${notes.length} notes`);

    for (const note of notes) {
      // Create 1-3 history entries per note
      const historyCount = Math.floor(Math.random() * 5) + 1;

      for (let i = 0; i < historyCount; i++) {
        await NoteHistory.create({
          noteId: note.id,
          userId: note.updatedBy,
          workspaceId: note.workspaceId,
          oldTitle: `${note.title} (v${i + 1})`,
          oldContent: `Previous version of content for: ${note.title}`,
          oldIsDraft: note.isDraft,
          oldPublishedAt: note.publishedAt,
          oldType: note.type,
        });
      }

      console.log(`Created ${historyCount} history entries for: ${note.title}`);
    }

    const totalHistory = await NoteHistory.query().count('* as total');
    console.log(
      `Total history entries created: ${totalHistory[0].$extras.total}`,
    );
  }
}
