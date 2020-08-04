import React from 'react';

const Chat = (props) => {
  const { caption } = props;
  return (
    <h6>{caption}</h6>
  );
};

export default Chat;
