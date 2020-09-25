import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';

import routes from '../../routes';
import RollbarContext from '../../rollbarContext';

export default ({ modalData: { onClose } }) => {
  const [feedback, setFeedback] = useState('');
  const [process, setProcess] = useState('idle');
  const { rollbar } = useContext(RollbarContext);
  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: (values) => {
      setProcess('pending');
      axios
        .post(routes.channelsPath(), { data: { attributes: { name: values.channelName } } })
        .then(onClose)
        .catch((error) => {
          setProcess('rejected');
          setFeedback(`${error.name}: ${error.message}`);
          rollbar.error(error);
        });
    },
  });

  const inputChannel = useRef();
  useEffect(() => {
    inputChannel.current.focus();
  }, []);

  const isDisabled = process === 'pending';

  return (
    <Modal backdrop="static" show>
      <Modal.Header closeButton onHide={onClose}>
        <Modal.Title>Add Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
