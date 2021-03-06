import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import routes from '../../routes';

export default ({ modalData: { id, name, onClose } }) => {
  const schema = yup.object({ channelName: yup.string().trim().required() });
  const [feedback, setFeedback] = useState('');
  const formik = useFormik({
    initialValues: {
      channelName: name,
    },
    onSubmit: (values) => (
      axios
        .patch(routes.channelPath(id), { data: { attributes: { name: values.channelName } } })
        .then(onClose)
        .catch((error) => {
          setFeedback(`${error.name}: ${error.message}`);
        })
    ),
    validationSchema: schema,
  });

  const inputChannel = useRef();
  useEffect(() => {
    inputChannel.current.select();
  }, []);

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
