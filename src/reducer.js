import { combineReducers } from 'redux';

import channels from './features/channels/channelsSlice';
import currentChannelId from './features/channels/currentChannelIdSlice';
import messages from './features/messages/messagesSlice';

export default combineReducers({
  channels,
  currentChannelId,
  messages,
});
