import vine, { SimpleMessagesProvider } from '@vinejs/vine';

export const noteVoteValidator = vine.compile(
  vine.object({
    vote: vine.enum(['up', 'down']),
  }),
);

noteVoteValidator.messagesProvider = new SimpleMessagesProvider({
  'vote.required': 'Vote is required',
  'vote.enum': 'Vote must be either up or down',
});
