import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, action) {
      const channel = action.payload;
      state.push(channel);
    },
    removeChannel(state, action) {
      const { id: removeId } = action.payload;
      const newChannels = state.filter(({ id }) => id !== removeId);
      return newChannels;
    },
    renameChannel(state, action) {
      const renamedChannel = action.payload;
      const newChannels = state.map(
        (channel) => ((renamedChannel.id === channel.id) ? renamedChannel : channel),
      );
      return newChannels;
    },
  },
});

export const { addChannel, removeChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
