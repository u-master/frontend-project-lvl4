import React, { useState } from 'react';
import {
  Modal,
  FormGroup,
  Button,
} from 'react-bootstrap';
import axios from 'axios';

import routes from '../../routes';

export default ({ modalData: { id, onClose } }) => {
  const [feedback, setFeedback] = useState('');
  const [process, setProcess] = useState('idle');
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcess('pending');
    axios
      .delete(
        routes.channelPath(id),
        { timeout: 5000 },
      ).catch((error) => {
        setProcess('rejected');
        setFeedback(`${error.name}: ${error.message}`);
      }).then(onClose);
  };

  return (
    <Modal backdrop="static" show>
      <Modal.Header closeButton onHide={onClose}>
        <Modal.Title>
          Remove Channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <p>Are you sure?</p>
            <div className="d-block text-danger small">{feedback}</div>
          </FormGroup>
          <Button variant="danger" type="submit" className="mr-2" disabled={process === 'pending'}>Remove</Button>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
