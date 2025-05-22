import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const style = {
  position: "absolute",
  width: 280,
  background: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  borderRadius: 6,
  padding: 12,
  zIndex: 10000,
};

export default function DefinitionPopup({ selectedText, definition, pos, onClose }) {
  if (!selectedText) return <></>;

  return ReactDOM.createPortal(
    <div style={{ ...style, top: pos.y, left: pos.x }} className="popup">
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          border: "none",
          background: "transparent",
          fontSize: 16,
          cursor: "pointer",
        }}
        className="popup"
      >X</button>

      <div style={{ fontWeight: "bold", marginBottom: 6 }} className="popup">
        <p className="popup">{selectedText}</p>
      </div>

      <div style={{ fontSize: 14, lineHeight: 1.4, marginBottom: 8 }} className="popup">
        <p className="popup">{definition}</p>
      </div>

      <a
        href={`https://www.google.com/search?q=${encodeURIComponent(selectedText)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "6px 12px",
          background: "#4285F4",
          color: "#fff",
          borderRadius: 4,
          textDecoration: "none",
          fontSize: 13,
        }}
        className="popup"
      >
        구글에서 더 보기
      </a>
    </div>,
    document.body
  );
}
