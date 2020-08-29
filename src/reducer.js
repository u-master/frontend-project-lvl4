import { combineReducers } from 'redux';

import channels from './slices/channels';
import currentChannelId from './slices/currentChannelId';
import messages from './slices/messages';

export default combineReducers({
  channels,
  currentChannelId,
  messages,
});
