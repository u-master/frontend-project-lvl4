import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateToProps = ({ messages, currentChannelId }) => ({
  messages: messages.filter(({ channelId }) => (channelId === currentChannelId)),
});

const Messages = (props) => {
  const { messages } = props;
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

export default connect(mapStateToProps)(Messages);
