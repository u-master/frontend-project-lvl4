import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      state.push(action.payload);
    },
    removeMessagesOfChannel(state, action) {
      return state.filter(({ channelId }) => channelId !== action.payload.channelId);
    },
  },
});

export const {
  addMessage,
  removeMessagesOfChannel,
} = messagesSlice.actions;

export default messagesSlice.reducer;
