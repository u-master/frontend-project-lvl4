import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';

import Chat from './components/Chat';

import reducer from './reducer';
import { addMessage, removeMessagesOfChannel } from './slices/messagesSlice';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice';
import { setCurrentChannelId } from './slices/currentChannelIdSlice';

import UserContext from './userContext';

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
    },
  });

  const defaultChannelId = (channels[0] || [{ id: 0 }]).id;

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
    store.dispatch(removeMessagesOfChannel({ channelId: id }));
    if (store.getState().currentChannelId === id) {
      store.dispatch(setCurrentChannelId({ id: defaultChannelId }));
    }
  });
  socket.on('renameChannel', ({ data: { attributes } }) => {
    store.dispatch(renameChannel(attributes));
  });

  const app = (
    <Provider store={store}>
      <UserContext.Provider value={{ username }}>
        <Chat />
      </UserContext.Provider>
    </Provider>
  );
  ReactDOM.render(app, container);
};
