import React from 'react';

import ChannelsList from './ChannelsList';
import Messages from './Messages';
import MessageForm from './MessageForm';

export default () => (
  <div className="row h-100 pb-4">
    <ChannelsList className="col-3 border-right" />
    <div className="col d-flex flex-column justify-content-between h-100">
      <Messages />
      <MessageForm />
    </div>
  </div>
);
