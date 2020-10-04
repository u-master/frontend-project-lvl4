import { createSelector } from 'reselect';

const channelsSelector = ({ channelsInfo: { channels } }) => channels;

const currentChannelIdSelector = ({ channelsInfo: { currentChannelId } }) => currentChannelId;

const messagesSelector = createSelector(
  ({ messages }) => messages,
  currentChannelIdSelector,
  (messages, currentChannelId) => (
    messages.filter(({ channelId }) => channelId === currentChannelId)
  ),
);

const draftSelector = createSelector(
  ({ drafts }) => drafts,
  currentChannelIdSelector,
  (drafts, currentChannelId) => drafts[currentChannelId] ?? '',
);

export {
  channelsSelector,
  currentChannelIdSelector,
  messagesSelector,
  draftSelector,
};
