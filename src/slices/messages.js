import { createSlice } from '@reduxjs/toolkit';

import { removeChannel } from './channelsInfo';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload }) {
      state.push(payload);
    },
  },
  extraReducers: {
    [removeChannel](state, { payload: { id } }) {
      return state.filter(({ channelId }) => channelId !== id);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
