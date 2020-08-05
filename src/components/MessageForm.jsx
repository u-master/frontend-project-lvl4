import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import axios from 'axios';

import routes from '../routes';

import UserContext from '../features/user/userContext';

const mapStateToProps = ({ currentChannelId }) => ({ currentChannelId });

const MessageForm = ({ currentChannelId }) => {
  const [text, setText] = useState('');
  const [process, setProcess] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const { username } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = routes.channelMessagesPath(currentChannelId);
    setProcess('pending');
    axios
      .post(url, { data: { attributes: { text, username } } }, { timeout: 5000 })
      .then(() => {
        setText('');
        setFeedback('');
        setProcess('fulfilled');
      })
      .catch((error) => {
        setProcess('rejected');
        setFeedback(`${error.name}: ${error.message}`);
      });
  };

  const handleChange = ({ target: { value } }) => {
    setText(value);
  };

  const inputClasses = cn({
    'w-100': true,
    'is-invalid': process === 'rejected',
  });

  return (
    <form onSubmit={handleSubmit}>
      <input className={inputClasses} name="message" type="text" onChange={handleChange} value={text} disabled={process === 'pending'} />
      <div className="d-block invalid-feedback">{feedback}</div>
    </form>
  );
};

export default connect(mapStateToProps)(MessageForm);
