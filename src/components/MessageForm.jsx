import React, {
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';

import routes from '../routes';

import UserContext from '../userContext';
import { setDraft } from '../slices/drafts';
import { currentChannelIdSelector, draftSelector } from '../selectors';

const MessageForm = () => {
  const [process, setProcess] = useState('idle');
  const { username } = useContext(UserContext);
  const inputMessage = useRef();
  const currentChannelId = useSelector(currentChannelIdSelector);
  const draft = useSelector(draftSelector);

  const dispatch = useDispatch();

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
        .catch((error) => {
          setProcess('rejected');
          setFieldValue('feedback', `${error.name}: ${error.message}`);
        })
        .then(() => {
          resetForm();
          setProcess('fulfilled');
        });
    },
  });

  useEffect(() => {
    const channelId = currentChannelId;
    formik.setFieldValue('message', draft);
    inputMessage.current.focus();
    return () => {
      const message = inputMessage.current.value;
      dispatch(setDraft({ channelId, message }));
    };
  }, [currentChannelId]);

  useEffect(() => { inputMessage.current.focus(); }, [process]);

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
