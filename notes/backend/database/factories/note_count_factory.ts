import VoteCount from '#models/vote_count'
import Factory from '@adonisjs/lucid/factories'

export default Factory.define(VoteCount, () => {
  return {
    upVoteCount: 0,
    downVoteCount: 0,
  }
}).build()
