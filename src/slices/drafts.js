import { createSlice } from '@reduxjs/toolkit';

const draftSlice = createSlice({
  name: 'drafts',
  initialState: {},
  reducers: {
    setDraft(state, action) {
      const { channelId, message } = action.payload;
      return { ...state, [channelId]: message };
    },
  },
});

export const { setDraft } = draftSlice.actions;

export default draftSlice.reducer;
