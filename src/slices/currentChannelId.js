import { createSlice } from '@reduxjs/toolkit';

import { removeChannel } from './channels';

const defaultId = 1;

const currentChannelIdSlice = createSlice({
  name: 'currentChannelIdSlice',
  initialState: defaultId,
  reducers: {
    setCurrentChannelId(state, { payload: { id } }) {
      return id;
    },
  },
  extraReducers: {
    [removeChannel](state, { payload: { id } }) {
      return state === id ? defaultId : state;
    },
  },
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;

export default currentChannelIdSlice.reducer;
