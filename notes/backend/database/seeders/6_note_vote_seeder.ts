import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Note from '#models/note';
import User from '#models/user';
import NoteVote from '#models/note_vote';

export default class NoteVoteSeeder extends BaseSeeder {
  async run() {
    // Only create votes for public notes
    const publicNotes = await Note.query();

    const allUsers = await User.all();

    console.log(`Creating votes for ${publicNotes.length} public notes`);

    for (const note of publicNotes) {
      // Get random users (excluding note author) to vote
      const eligibleVoters = allUsers.filter((u) => u.id !== note.userId);
      const voterCount =
        Math.floor(Math.random() * Math.min(10, eligibleVoters.length)) + 1;
      const voters = this.shuffleArray(eligibleVoters).slice(0, voterCount);

      let upVotes = 0;
      let downVotes = 0;

      for (const voter of voters) {
        // 70% chance of upvote, 30% chance of downvote
        const voteType = Math.random() > 0.3 ? 'up' : 'down';

        await NoteVote.create({
          noteId: note.id,
          userId: voter.id,
          vote: voteType,
        });

        if (voteType === 'up') {
          upVotes++;
        } else {
          downVotes++;
        }
      }

      // Create or update vote count
      await Note.updateOrCreate(
        { id: note.id },
        {
          id: note.id,
          count: upVotes - downVotes,
        },
      );

      console.log(
        `Note "${note.title}": ${upVotes} upvotes, ${downVotes} downvotes`,
      );
    }

    const totalVotes = await NoteVote.query().count('* as total');
    console.log(`Total votes created: ${totalVotes[0].$extras.total}`);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
