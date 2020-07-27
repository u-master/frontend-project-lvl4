import React from 'react';
import ReactDOM from 'react-dom';

import ChannelsList from './components/channels-list';
import Chat from './components/chat';
import MessageForm from './components/message-form';

const container = document.querySelector('.container');

export default (data) => {
  const { channels } = data;
  const app = (
    <div className="row">
      <div className="col-3 border-right">
        <ChannelsList channels={channels} />
      </div>
      <div className="col d-flex flex-column h-100">
        <Chat caption="Chat Here!" />
        <MessageForm />
      </div>
    </div>
  );
  ReactDOM.render(app, container);
};
