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
    <form onSubmit={handleSubmit} style={{
      width: "100%",
      height: 52,
      display: "flex",
      alignItems: "center",
      borderRadius: 1000,
      border: "#FF5555 2px solid",
      overflow: "hidden",
      fontSize: 24
    }}>
      <input
        type="text"
        placeholder="https://github.com/osoohynn"
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{
          flex: 1,
          padding: "8px 16px",
          height: "100%",
          border: "none",
          outline: "none",
          fontSize: 20
        }}
      />
      <button type="submit" style={{
        width: 52,
        height: "100%",
        borderRadius: 1000,
        background: "#FF5555",
        color: "white",
        border: "none",
        fontSize: 20
      }}>🔍</button>
    </form>
  );
}