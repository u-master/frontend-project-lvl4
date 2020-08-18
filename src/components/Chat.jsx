import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ChannelsList from './ChannelsList';
import Messages from './Messages';
import MessageForm from './MessageForm';

export default () => (
  <Row className="h-100 pb-4 flex-nowrap">
    <Col xs={3} className="border-right overflow-auto">
      <ChannelsList />
    </Col>
    <Col className="d-flex flex-column justify-content-between h-100">
      <Messages />
      <MessageForm />
    </Col>
  </Row>
);
