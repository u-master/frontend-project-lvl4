import React from 'react';
import ReactDOM from 'react-dom';

import ChannelsList from './components/channels-list';
import Chat from './components/chat';
import MessageForm from './components/message-form';

const container = document.querySelector('.container');

export default (data) => {
  const { channels } = data;
  const app = (
    <div className="row h-100 pb-4">
      <ChannelsList channels={channels} className="col-3 border-right" />
      <div className="col d-flex flex-column justify-content-between h-100">
        <Chat caption="Chat Here!" />
        <MessageForm />
      </div>
    </div>
  );
  ReactDOM.render(app, container);
};
