import React, {
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';

import routes from '../routes';

import UserContext from '../userContext';

const MessageForm = () => {
  const [process, setProcess] = useState('idle');
  const { username } = useContext(UserContext);
  const inputMessage = useRef();
  const currentChannelId = useSelector((state) => state.currentChannelId);

  useEffect(() => { inputMessage.current.focus(); }, null);

  const formik = useFormik({
    initialValues: {
      message: '',
      feedback: '',
    },
    onSubmit: ({ message }, { resetForm, setFieldValue, setSubmitting }) => {
      if (message.trim() === '') {
        resetForm();
        setSubmitting(false);
        return;
      }
      const url = routes.channelMessagesPath(currentChannelId);
      setProcess('pending');
      axios
        .post(url, { data: { attributes: { message, username } } }, { timeout: 5000 })
        .then(() => {
          resetForm();
          setProcess('fulfilled');
        })
        .catch((error) => {
          setProcess('rejected');
          setFieldValue('feedback', `${error.name}: ${error.message}`);
        });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Control
        className="w-100"
        isInvalid={process === 'rejected'}
        name="message"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.message}
        disabled={process === 'pending'}
        ref={inputMessage}
      />
      <Form.Control.Feedback className="d-block" type="invalid">
        {formik.values.feedback}
      </Form.Control.Feedback>
    </Form>
  );
};

export default MessageForm;
