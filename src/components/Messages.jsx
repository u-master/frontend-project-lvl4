import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
// import StoreContext from '../contexts/storeContext';

const mapStateToProps = ({ messages, currentChannelId }) => ({
  messages: messages.filter(({ channelId }) => (channelId === currentChannelId)),
});

const Messages = ({ messages }) => (
  // const { messages, currentChannelId } = props;
  // const { messages, currentChannelId } = useContext(StoreContext);
  // const channelMessages = messages.filter(({ channelId }) => (channelId === currentChannelId));
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
// };

export default connect(mapStateToProps)(Messages);

// export default Messages;
