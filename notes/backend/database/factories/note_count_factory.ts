import Factory from '@adonisjs/lucid/factories'
import VoteCount from '#models/vote_count'

export default Factory.define(VoteCount, () => {
  return {
    upVoteCount: 0,
    downVoteCount: 0,
  }
}).build()