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

export default ({ modalData: { onClose } }) => {
  const [feedback, setFeedback] = useState('');
  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: (values) => (
      axios
        .post(routes.channelsPath(), { data: { attributes: { name: values.channelName } } })
        .then(onClose)
        .catch((error) => {
          setFeedback(`${error.name}: ${error.message}`);
        })
    ),
  });

  const inputChannel = useRef();
  useEffect(() => {
    inputChannel.current.focus();
  }, []);

  return (
    <Modal backdrop="static" show>
      <Modal.Header closeButton onHide={onClose}>
        <Modal.Title>Add Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              value={formik.values.channelName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              ref={inputChannel}
              name="channelName"
              disabled={formik.isSubmitting}
            />
            <div className="d-block invalid-feedback">{feedback}</div>
          </FormGroup>
          <Button variant="primary" type="submit" className="mr-2" disabled={formik.isSubmitting}>
            Add
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
