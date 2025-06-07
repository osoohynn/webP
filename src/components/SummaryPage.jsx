import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import DefinitionPopup from "./DefinitionPopup";
import { useSelectionDefinition } from "./useSelectionDefinition";

export default function SummaryPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.data) {
    return <Navigate to="/" replace />;
  }

  const { subject, summary, keywords } = state.data;
  const { selectedText, definition, pos, show, setShow } = useSelectionDefinition();

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.pageTitle}>오늘은 어떤 정보를 얻을까요?</h1>

      <div style={styles.card}>
        {/* 주제 & 내용 박스 */}
        <div style={styles.box}>
          <div style={styles.row}>
            <span style={styles.label}>주제</span>
            <span style={styles.subject}>{subject}</span>
          </div>
          <div style={styles.row}>            
            <span style={styles.label}>내용</span>
            <div style={styles.content}>{summary}</div>
          </div>
          {keywords?.length > 0 && (
            <div style={styles.row}>
              <span style={styles.label}>핵심 키워드</span>
              <div style={styles.tags}>
                {keywords.map((kw, i) => (
                  <span key={i} style={styles.tag}>#{kw}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 액션 버튼 */}
        <div style={styles.buttonRow}>
          <button style={styles.primaryBtn} onClick={() => navigate("/")}>
            다른 글 요약하기
          </button>
        </div>

        {/* Definition Popup */}
        {selectedText && show && (
          <DefinitionPopup
            selectedText={selectedText}
            definition={definition}
            pos={pos}
            onClose={() => setShow(false)}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    height: "100vh",
    padding: '140px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: "border-box",
    overflow: "hidden",
    userSelect: 'none',
  },
  pageTitle: {
    marginBottom: 12,
    fontSize: 24,
    color: '#333',
    fontWeight: 450
  },
  card: {
    background: '#fff',
    borderRadius: 8,
    width: '100%',
    maxWidth: 800,
    padding: 24,
    userSelect: 'text',
  },
  box: {
    border: '1px solid #ffcccc',
    borderRadius: 12,
    padding: 28,
    marginBottom: 24,
  },
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  label: {
    flexShrink: 0,
    background: '#fff',
    border: '1px solid #ffabab',
    borderRadius: 12,
    padding: '2px 8px',
    marginRight: 12,
    fontSize: 12,
    color: '#d04545',
  },
  subject: {
    fontWeight: 650,
    fontSize: 16,
    color: '#444',
    lineHeight: 1.4,
  },
  list: {
    margin: 0,
    paddingLeft: 16,
    color: '#555',
    fontSize: 14,
    lineHeight: 1.5,
  },
  line: {
    marginBottom: 6,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: 999,
    padding: '4px 12px',
    fontSize: 12,
    color: '#666',
  },
  buttonRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryBtn: {
    background: '#ff7f7f',
    border: 'none',
    borderRadius: 6,
    padding: '10px 20px',
    color: '#fff',
    fontSize: 14,
    cursor: 'pointer',
    margin: "auto"
  },
  textBtn: {
    background: 'transparent',
    border: 'none',
    color: '#1a73e8',
    fontSize: 14,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  content: {
    whiteSpace: 'pre-wrap',
    fontSize: 14,
    color: '#555',
    lineHeight: 1.5,
    marginBottom: 12,
    userSelect: 'text',
  },
};
