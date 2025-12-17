import NoteVote from '#models/note_vote'
import VoteCount from '#models/vote_count'

export default class NoteVoteRepository {
  async createNoteVote(vote: 'up' | 'down', noteId: number, userId: number) {
    const voteCount = await VoteCount.firstOrCreate(
      { noteId },
      { upVoteCount: 0, downVoteCount: 0 }
    )
    if (vote === 'up') {
      voteCount.upVoteCount += 1
    } else {
      voteCount.downVoteCount += 1
    }

    await NoteVote.create({
      noteId,
      userId,
      vote,
    })
    await voteCount.save()

    return {
      success: true,
      message: 'Done voting.',
    }
  }

  async updateNoteVote(noteVote: NoteVote, vote: 'up' | 'down') {
    const voteCount = await VoteCount.firstOrCreate(
      { noteId: noteVote.noteId },
      { upVoteCount: 0, downVoteCount: 0 }
    )

    if (vote !== noteVote.vote) {
      if (vote === 'up') {
        voteCount.upVoteCount += 1
        voteCount.downVoteCount -= 1
      } else {
        voteCount.upVoteCount -= 1
        voteCount.downVoteCount += 1
      }
    }

    noteVote.merge({ vote })
    await noteVote.save()
    await voteCount.save()

    return {
      success: true,
      message: 'Successfully updated the vote.',
    }
  }

  async getNoteVote(noteId: number, userId: number) {
    const noteVote = await NoteVote.query().where('noteId', noteId).where('userId', userId).first()

    return noteVote
  }

  async getVoteCount(noteId: number) {
    const noteVote = await VoteCount.query().where('noteId', noteId).first()

    if (!noteVote) {
      throw new Error('this note does not exists')
    }

    return noteVote
  }
  async getVote(noteId: number, userId: number) {
    const noteVote = await NoteVote.query()
      .where('note_id', noteId)
      .where('user_id', userId)
      .first()

    return noteVote
  }
}
