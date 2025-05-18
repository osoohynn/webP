import React, { useState } from 'react';

export default function PostInput({ summary }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    summary(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="https://github.com/osoohynn"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit">???</button>
    </form>
  );
}