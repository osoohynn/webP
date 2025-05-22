import { useSelectionDefinition } from "./useSelectionDefinition";
import DefinitionPopup from "./DefinitionPopup";
import React, { useEffect } from "react";

export default function Summary({ data, onReset }) {
  const { subject, summary, keywords } = data;
  const { selectedText, definition, pos, show, setShow } = useSelectionDefinition();

  return (
    <div style={{ padding: 20, position: "relative" }}>
      <h2>{subject}</h2>
      <p style={{ whiteSpace: "pre-wrap" }}>{summary}</p>
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

      {/* 드래그로 텍스트가 선택되었고, 팝업이 열려있다면 */}
      {selectedText && show && (
        <DefinitionPopup
          selectedText={selectedText}
          definition={definition}
          pos={pos}
          onClose={() => setShow(false)}
        />
      )}
    </div>
  );
}
