import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, { payload: newChannel }) {
      state.push(newChannel);
    },
    removeChannel(state, { payload: { id: removeId } }) {
      return state.filter(({ id }) => id !== removeId);
    },
    renameChannel(state, { payload: renamedChannel }) {
      return state.map(
        (channel) => ((renamedChannel.id === channel.id) ? renamedChannel : channel),
      );
    },
  },
});

export const { addChannel, removeChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
