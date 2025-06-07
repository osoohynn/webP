import React, { useState, useEffect } from "react";
import PostInput from "./PostInput"
import RecentPost from "./RecentPost"
import Option from "./Optoin";
import { useNavigate } from "react-router-dom";
import { fetchSummary } from "./GptService";
import { validateUrl, fetchPageText } from "./UrlService";

export default function MainApp() {
  const [selectedLength, setSelectedLength] = useState("300자 이내");
  const [lastUrl, setLastUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // 로딩 시 프로그레스 바 애니메이션
  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 10;
        return next < 99 ? next : 99;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [isLoading]);

  const summary = async (url) => {
    try {
      if (!validateUrl(url)) {
        alert(url + '는 유효한 url이 아닙니다.');
        throw new Error("유효한 url이 아닙니다.");
      }
      setErrorMessage("");
      setIsLoading(true);
      const text = await fetchPageText(url);
      const parsed = await fetchSummary({ url, text, selectedLength });

      setLastUrl(url);
      setIsLoading(false);
      navigate("/summary", { state: { data: parsed } });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setErrorMessage("페이지 접속 권한이 없습니다.");
    }
  };

  const closeError = () => {
    setErrorMessage("");
  };

  return (
    <div style={{ width: '100%', height: "100vh", 
      display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        padding: 20,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 550
      }}>
        <div style={{ fontSize: 24, marginBottom: 10, fontWeight: 400 }}>오늘은 어떤 정보를 얻을까요?</div>
        <PostInput summary={summary} />
        <Option value={selectedLength} onChange={setSelectedLength} />
        <RecentPost newUrl={lastUrl} />
      </div>

      {(isLoading || errorMessage) && (
        <div style={{ 
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%", 
          height: "100vh", 
          background: "rgba(0,0,0,0.4)", 
          zIndex: 100000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div style={{
            width: 300,
            padding: 20,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            textAlign: "center",
          }}>
            {!errorMessage ? (
              <>
                <div style={{ marginBottom: 12, fontSize: 16, color: "#333" }}>로딩 중...</div>
                <div style={{
                  width: "100%",
                  height: 12,
                  background: "#eee",
                  borderRadius: 6,
                  overflow: "hidden",
                  marginBottom: 8,
                }}>
                  <div style={{
                    width: `${Math.floor(progress)}%`,
                    height: "100%",
                    background: "#ff7f7f",
                    transition: "width 0.3s ease",
                  }} />
                </div>
                <div style={{ fontSize: 14, color: "#555" }}>{`${Math.floor(progress)}%`}</div>
              </>
            ) : (
              <>
                <div style={{ marginBottom: 12, fontSize: 16, color: "#e00" }}>
                  {errorMessage}
                </div>
                <button onClick={closeError} style={{
                  padding: "6px 12px",
                  background: "#ff7f7f",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer"
                }}>
                  확인
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
