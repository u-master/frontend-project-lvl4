import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Button, Nav } from 'react-bootstrap';

import { setCurrentChannelId } from '../slices/channels';
import { channelsSelector, currentChannelIdSelector } from '../selectors';

import getModal from './modals';

const renderModal = ({ type, modalData }) => {
  if (!type) return null;
  const Modal = getModal(type);
  return <Modal modalData={modalData} />;
};

const ChannelsList = () => {
  const [modal, setModal] = useState({ type: null });
  const channels = useSelector(channelsSelector);
  const currentChannelId = useSelector(currentChannelIdSelector);

  const dispatch = useDispatch();

  const handleChooseChannel = (id) => () => {
    dispatch(setCurrentChannelId({ id }));
  };

  const handleCloseModal = () => {
    setModal({ type: null });
  };

  const handleModalAppear = (type, data) => () => {
    setModal({ type, modalData: { ...data, onClose: handleCloseModal } });
  };

  if (channels.length === 0) return null;
  return (
    <>
      <div className="d-flex justify-content-between align-items-baseline mb-1">
        <h6>Channels</h6>
        <Button variant="link" className="p-0" onClick={handleModalAppear('addChannel')}>
          +
        </Button>
      </div>
      <Nav fill variant="pills" className="flex-column" activeKey={currentChannelId}>
        {channels.map(({ id, name, removable }) => (
          <Nav.Item key={id} className="btn-group p-1">
            <Nav.Link
              as="button"
              className="btn w-100"
              eventKey={id}
              onSelect={handleChooseChannel(id)}
            >
              {name}
            </Nav.Link>
            {removable && (
              <ButtonGroup vertical size="sm">
                <Button variant="danger" onClick={handleModalAppear('removeChannel', { id })}>
                  Remove
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleModalAppear('renameChannel', { id, name })}
                >
                  Rename
                </Button>
              </ButtonGroup>
            )}
          </Nav.Item>
        ))}
      </Nav>
      {renderModal(modal)}
    </>
  );
};

export default ChannelsList;
