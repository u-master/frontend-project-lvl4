/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channelsItems: [], currentChannelId: 0, defaultChannelId: 0 },
  reducers: {
    addChannel({ channelsItems }, { payload: newChannel }) {
      channelsItems.push(newChannel);
    },
    removeChannel(state, { payload: { id: idRemove } }) {
      const { channelsItems, currentChannelId, defaultChannelId } = state;
      state.channelsItems = channelsItems.filter(({ id }) => id !== idRemove);
      if (currentChannelId === idRemove) state.currentChannelId = defaultChannelId;
    },
    renameChannel({ channelsItems }, { payload: renamedChannel }) {
      const channelIndex = channelsItems.findIndex(({ id }) => id === renamedChannel.id);
      channelsItems[channelIndex] = renamedChannel;
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
