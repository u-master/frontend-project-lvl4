import React from 'react';

const ChannelsList = (props) => {
  const { channels } = props;
  if (channels.length === 0) return null;
  return (
    <div>
      <h6>Channels</h6>
      <ul>
        {channels.map(({ id, name }) => <li key={id}>{name}</li>)}
      </ul>
    </div>
  );
};

export default ChannelsList;
