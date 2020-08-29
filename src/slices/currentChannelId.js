import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelIdSlice',
  initialState: 0,
  reducers: {
    setCurrentChannelId(state, { payload: { id } }) {
      return id;
    },
  },
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;

export default currentChannelIdSlice.reducer;
