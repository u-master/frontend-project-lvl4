import { combineReducers } from 'redux';

import channels from './slices/channelsSlice';
import currentChannelId from './slices/currentChannelIdSlice';
import messages from './slices/messagesSlice';

export default combineReducers({
  channels,
  currentChannelId,
  messages,
});
