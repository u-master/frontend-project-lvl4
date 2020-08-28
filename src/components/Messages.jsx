import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Messages = () => {
  const messages = useSelector(
    (state) => (
      state.messages.filter(({ channelId }) => (channelId === state.currentChannelId))
    ),
  );
  return (
    <ListGroup variant="flush" className="overflow-auto text-wrap text-break">
      {messages.map(({ id, username, message }) => (
        <ListGroup.Item key={id}>
          <b>
            {username}
            :
          </b>
          {` ${message}`}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Messages;
