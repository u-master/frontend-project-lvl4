import React, { useContext, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import routes from '../routes';

import UserContext from '../userContext';
import { setDraft } from '../slices/drafts';
import { currentChannelIdSelector, draftSelector } from '../selectors';

const MessageForm = () => {
  const { username } = useContext(UserContext);
  const inputMessage = useRef();
  const currentChannelId = useSelector(currentChannelIdSelector);
  const draft = useSelector(draftSelector);
  const scheme = yup.object({ message: yup.string().trim().required() });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      message: '',
      feedback: '',
    },
    onSubmit: ({ message }, { resetForm, setFieldValue }) => {
      const url = routes.channelMessagesPath(currentChannelId);
      return axios
        .post(url, { data: { attributes: { message, username } } })
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          setFieldValue('feedback', `${error.name}: ${error.message}`);
        });
    },
    validationSchema: scheme,
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

  useEffect(() => {
    inputMessage.current.focus();
  }, [formik.isSubmitting]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Control
        className="w-100"
        name="message"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.message}
        disabled={formik.isSubmitting}
        ref={inputMessage}
      />
      <Form.Control.Feedback className="d-block" type="invalid">
        {formik.values.feedback}
      </Form.Control.Feedback>
    </Form>
  );
};

export default MessageForm;
