import React from 'react';

const ChannelsList = (props) => {
  const { channels, className } = props;
  if (channels.length === 0) return null;
  return (
    <div className={className}>
      <div className="d-flex justify-content-between align-items-baseline mb-1">
        <h6>Channels</h6>
        <button className="btn btn-link p-0" type="button">+</button>
      </div>
      <ul className="nav nav-pills nav-fill flex-column">
        {channels.map(({ id, name }) => (
          <li key={id} className="nav-item">
            <button type="button" className="nav-link btn w-100">{name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsList;
