import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';

import routes from '../../routes';

export default ({ modalData: { id, name, onClose } }) => {
  const [feedback, setFeedback] = useState('');
  const [process, setProcess] = useState('idle');
  const formik = useFormik({
    initialValues: {
      channelName: name,
    },
    onSubmit: (values) => {
      setProcess('pending');
      axios
        .patch(routes.channelPath(id), { data: { attributes: { name: values.channelName } } })
        .catch((error) => {
          setProcess('rejected');
          setFeedback(`${error.name}: ${error.message}`);
        })
        .then(onClose);
    },
  });

  const inputChannel = useRef();
  useEffect(() => {
    inputChannel.current.select();
  }, []);

  const isDisabled = process === 'pending';

  return (
    <Modal backdrop="static" show>
      <Modal.Header closeButton onHide={onClose}>
        <Modal.Title>Rename Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Enter new name for &lsquo;
          {name}
          &rsquo; channel:
        </p>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className={process === 'rejected' ? 'is-invalid' : ''}
              value={formik.values.channelName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              ref={inputChannel}
              name="channelName"
              disabled={isDisabled}
            />
            <div className="d-block invalid-feedback">{feedback}</div>
          </FormGroup>
          <Button variant="primary" type="submit" className="mr-2" disabled={isDisabled}>
            Rename
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
