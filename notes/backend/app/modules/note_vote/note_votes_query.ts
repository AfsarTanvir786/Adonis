import NoteVote from '#models/note_vote'
import VoteCount from '#models/vote_count'

export default class NoteVoteRepository {
  async createNoteVote(vote: 'up' | 'down', noteId: number, userId: number) {
    const createNoteVote = {
      noteId: noteId,
      userId: userId,
      vote: vote,
    }
    let voteCount = await VoteCount.find(noteId)
    if (!voteCount) {
      voteCount = await VoteCount.create({ noteId: noteId })
    }
    if (vote === 'up') {
      voteCount.upVoteCount += 1
    } else {
      voteCount.downVoteCount += 1
    }

    await NoteVote.create(createNoteVote)
    await voteCount.save()

    return {
      success: true,
      message: 'Done voting.',
    }
  }

  async updateNoteVote(noteVote: NoteVote, vote: 'up' | 'down') {
    let voteCount = await VoteCount.find(noteVote.noteId)
    if (!voteCount) {
      voteCount = await VoteCount.create({ noteId: noteVote.noteId })
    }
    if (vote !== noteVote.vote) {
      if(vote === 'up'){
        voteCount.upVoteCount += 1;
        voteCount.downVoteCount -= 1;
      }else{
        voteCount.upVoteCount -= 1;
        voteCount.downVoteCount += 1;
      }
    }
    
    noteVote.merge({
      vote: vote,
    })
    await noteVote.save()

    return {
      success: true,
      message: 'Sucessfully update the vote.',
    }
  }

  async getNoteVote(noteId: number, userId: number) {
    const noteVote = await NoteVote.query().where('noteId', noteId).where('userId', userId).first()

    return noteVote
  }
}
