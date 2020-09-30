import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';
import Rollbar from 'rollbar';

import Chat from './components/Chat';

import reducer from './reducer';
import { addMessage } from './slices/messages';
import { addChannel, removeChannel, renameChannel } from './slices/channels';

import UserContext from './userContext';
import RollbarContext from './rollbarContext';

const getUsername = () => Cookies.get('username');
const setUsername = (newName) => Cookies.set('username', newName);

export default (gon) => {
  const { channels, currentChannelId, messages } = gon;
  const container = document.querySelector('.container');

  const username = getUsername() || faker.name.findName();
  setUsername(username);

  const store = configureStore({
    reducer,
    devTools: true,
    preloadedState: {
      channels: [...channels],
      currentChannelId,
      messages: [...messages],
      drafts: {},
    },
  });

  const socket = io({
    transports: ['websocket'],
  });

  socket.on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(addMessage(attributes));
  });
  socket.on('newChannel', ({ data: { attributes } }) => {
    store.dispatch(addChannel(attributes));
  });
  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(removeChannel({ id }));
  });
  socket.on('renameChannel', ({ data: { attributes } }) => {
    store.dispatch(renameChannel(attributes));
  });

  const rollbar = new Rollbar({
    accessToken: '6e2700e7fadb44aeae4c40768b291bdb',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      person: { id: username }, // фи, конечно, но нет у нас id у user-а (((
    },
  });

  const app = (
    <Provider store={store}>
      <UserContext.Provider value={{ username }}>
        <RollbarContext.Provider value={{ rollbar }}>
          <Chat />
        </RollbarContext.Provider>
      </UserContext.Provider>
    </Provider>
  );
  ReactDOM.render(app, container);
};
