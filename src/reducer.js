import { combineReducers } from 'redux';

import channels from './slices/channelsInfo';
import messages from './slices/messages';
import drafts from './slices/drafts';

export default combineReducers({
  channels,
  messages,
  drafts,
});
