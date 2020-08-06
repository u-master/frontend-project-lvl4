import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ messages, currentChannelId }) => ({
  messages: messages.filter(({ channelId }) => (channelId === currentChannelId)),
});

const Messages = (props) => {
  const { messages } = props;
  return (
    <ul className="list-unstyled">
      {messages.map(({ id, username, text }) => (
        <li key={id}>
          <b>
            {username}
            :
          </b>
          {` ${text}`}
        </li>
      ))}
    </ul>
  );
};

export default connect(mapStateToProps)(Messages);
