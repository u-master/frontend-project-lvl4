import React, { useState, useContext } from 'react';

import UserContext from '../features/user/userContext';

export default () => {
  const [text, setText] = useState('');
  const { username } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${username}: ${text}`);
    setText('');
  };

  const handleChange = ({ target: { value } }) => {
    setText(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className="w-100" name="message" type="text" onChange={handleChange} value={text} />
    </form>
  );
};
