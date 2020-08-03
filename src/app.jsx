import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import { uniqueId } from 'lodash';

import ChannelsList from './components/ChannelsList';
import Chat from './components/chat';
import MessageForm from './components/message-form';

import reducer from './reducer';

const getUsername = () => Cookies.get('username');
const setUsername = (newName) => Cookies.set('username', newName);

export default (data) => {
  const { channels, currentChannelId } = data;
  const container = document.querySelector('.container');

  const username = getUsername() || uniqueId('user-');
  setUsername(username);

  const store = configureStore({
    reducer,
    devTools: true,
    preloadedState: {
      channels,
      currentChannelId,
    },
  });

  const app = (
    <Provider store={store}>
      <div className="row h-100 pb-4">
        <ChannelsList channels={channels} className="col-3 border-right" />
        <div className="col d-flex flex-column justify-content-between h-100">
          <Chat caption="Chat Here!" />
          <MessageForm />
        </div>
      </div>
    </Provider>
  );
  ReactDOM.render(app, container);
};
