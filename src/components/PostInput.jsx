import React, { useState } from 'react';
import "../App.css";
import { Search } from "lucide-react";

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
      border: "#FF5555 1.5px solid",
      overflow: "hidden",
      fontSize: 24,
      boxShadow: "0px 0px 1px 1px rgba(255, 133, 133, 0.5)"
    }}>
      <input
        type="text"
        placeholder="https://github.com/osoohynn"
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{
          flex: 1,
          padding: "8px 24px",
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
      }}>
        <Search size={28} />
      </button>
    </form>
  );
}