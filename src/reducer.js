import { combineReducers } from 'redux';

import channelsInfo from './slices/channelsInfo';
import messages from './slices/messages';
import drafts from './slices/drafts';

export default combineReducers({
  channelsInfo,
  messages,
  drafts,
});
