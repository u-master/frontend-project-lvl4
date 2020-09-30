import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, { payload: newChannel }) {
      state.push(newChannel);
    },
    removeChannel(state, { payload: { id: idRemove } }) {
      return state.filter(({ id }) => id !== idRemove);
    },
    renameChannel(state, { payload: renamedChannel }) {
      const channelIndex = state.findIndex(({ id }) => id === renamedChannel.id);
      // eslint-disable-next-line no-param-reassign
      state[channelIndex] = renamedChannel;
    },
  },
});

export const { addChannel, removeChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
