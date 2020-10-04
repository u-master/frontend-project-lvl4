/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: { channels: [], currentChannelId: 0 },
  reducers: {
    addChannel({ channels }, { payload: newChannel }) {
      channels.push(newChannel);
    },
    removeChannel(state, { payload: { id } }) {
      const { channels, currentChannelId } = state;
      state.channels = channels.filter((channel) => channel.id !== id);
      if (currentChannelId === id) state.currentChannelId = channels[0].id;
    },
    renameChannel({ channels }, { payload: renamedChannel }) {
      const channelIndex = channels.findIndex(({ id }) => id === renamedChannel.id);
      channels[channelIndex] = renamedChannel;
    },
    setCurrentChannelId(state, { payload: { id } }) {
      state.currentChannelId = id;
    },
  },
});

export const {
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
