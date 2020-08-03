import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, action) {
      const { id, name, removable } = action.payload;
      state.push({ id, name, removable });
    },
  },
});

export const { addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
