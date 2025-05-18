import React from "react";

export default function Summary({ data, onReset }) {
	const { subject, summary, keywords } = data;

  return (
    <div style={{ padding: 20 }}>
      <h2>{subject}</h2>
      <p style={{ whiteSpace: 'pre-wrap' }}>{summary}</p>
      {keywords?.length > 0 && (
        <ul>
          {keywords.map((kw, i) => (
            <li key={i}>#{kw}</li>
          ))}
        </ul>
      )}
      <button onClick={onReset} style={{ marginTop: 16 }}>
        메인으로
      </button>
    </div>
  );
}