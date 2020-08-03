import { combineReducers } from 'redux';

import channels from './features/channels/channelsSlice';
import currentChannelId from './features/channels/currentChannelIdSlice';

export default combineReducers({
  channels,
  currentChannelId,
});
