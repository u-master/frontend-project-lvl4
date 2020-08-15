import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { setCurrentChannelId as _setCurrentChannelId } from '../features/channels/currentChannelIdSlice';

import getModal from './modals';

const mapStateToProps = ({ channels, currentChannelId }) => ({ channels, currentChannelId });

const mapDispatch = {
  setCurrentChannelId: _setCurrentChannelId,
};

const renderModal = ({ type, modalData }) => {
  if (type === 'none') return null;
  const Modal = getModal(type);
  return <Modal modalData={modalData} />;
};

const ChannelsList = (props) => {
  const {
    channels,
    currentChannelId,
    setCurrentChannelId,
    className,
  } = props;

  const [modal, setModal] = useState({ type: 'none' });

  const handleCloseModal = () => {
    setModal({ type: 'none' });
  };

  const handleChooseChannel = (id) => () => {
    setCurrentChannelId({ id });
  };

  const handleAddChannel = () => {
    setModal({ type: 'addChannel', modalData: { onClose: handleCloseModal } });
  };

  const handleRemoveChannel = (id) => () => {
    setModal({ type: 'removeChannel', modalData: { id, onClose: handleCloseModal } });
  };

  const handleRenameChannel = (id, name) => () => {
    setModal({ type: 'renameChannel', modalData: { id, name, onClose: handleCloseModal } });
  };

  if (channels.length === 0) return null;
  return (
    <div className={className}>
      <div className="d-flex justify-content-between align-items-baseline mb-1">
        <h6>Channels</h6>
        <button className="btn btn-link p-0" type="button" onClick={handleAddChannel}>+</button>
      </div>
      <ul className="nav nav-pills nav-fill flex-column">
        {channels.map(({ id, name, removable }) => {
          const btnClasses = cn({
            'nav-link btn': true,
            active: (id === currentChannelId),
            'w-80': removable,
            'w-100': !removable,
          });
          return (
            <li key={id} className="nav-item btn-group p-1">
              <button type="button" className={btnClasses} onClick={handleChooseChannel(id)}>
                {name}
              </button>
              {removable ? (
                <div className="btn-group-vertical btn-group-sm w-20" role="group">
                  <button className="btn btn-danger" type="button" onClick={handleRemoveChannel(id)}>
                    Remove
                  </button>
                  <button className="btn btn-secondary" type="button" onClick={handleRenameChannel(id, name)}>
                    Rename
                  </button>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
      {renderModal(modal)}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatch)(ChannelsList);
