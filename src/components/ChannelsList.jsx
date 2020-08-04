import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { addChannel as _addChannel } from '../features/channels/channelsSlice';
import { setCurrentChannelId as _setCurrentChannelId } from '../features/channels/currentChannelIdSlice';

const mapStateToProps = ({ channels, currentChannelId }) => ({ channels, currentChannelId });

const mapDispatch = {
  addChannel: _addChannel,
  setCurrentChannelId: _setCurrentChannelId,
};

const ChannelsList = (props) => {
  const {
    channels,
    currentChannelId,
    setCurrentChannelId,
    className,
  } = props;

  const handleChooseChannel = (id) => () => {
    setCurrentChannelId({ id });
  };

  if (channels.length === 0) return null;
  return (
    <div className={className}>
      <div className="d-flex justify-content-between align-items-baseline mb-1">
        <h6>Channels</h6>
        <button className="btn btn-link p-0" type="button">+</button>
      </div>
      <ul className="nav nav-pills nav-fill flex-column">
        {channels.map(({ id, name }) => {
          const btnClasses = cn({
            'nav-link btn w-100': true,
            active: (id === currentChannelId),
          });
          return (
            <li key={id} className="nav-item">
              <button type="button" className={btnClasses} onClick={handleChooseChannel(id)}>
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatch)(ChannelsList);
