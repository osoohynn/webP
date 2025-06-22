import React, { useState, useEffect } from "react";
import PostInput from "./PostInput"
import RecentPost from "./RecentPost"
import Option from "./Optoin";
import { useNavigate } from "react-router-dom";
import { fetchSummary } from "./GptService";
import { validateUrl, fetchPageText } from "./UrlService";

export default function MainApp() {
  const [selectedLength, setSelectedLength] = useState("300자 이내"); // 요약 길이 옵션
  const [lastUrl, setLastUrl] = useState(""); // 최근 요약한 글
  const [isLoading, setIsLoading] = useState(false); // 로딩 중
  const [errorMessage, setErrorMessage] = useState(""); // 실패 시 에러 메시지
  const [progress, setProgress] = useState(0); // 요약 중일 때 프로그레스 바
  const navigate = useNavigate();

  // 로딩 시 프로그레스 바 애니메이션
  useEffect(() => {
    if (!isLoading) { // 로딩 중이 아니라면
      setProgress(0);
      return; // 필요 없음
    }
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 10; // 랜덤으로 증가
        return next < 99 ? next : 99; // 99 이상이면 증가 x
      });
    }, 300);
    return () => clearInterval(interval);
  }, [isLoading]);

  const summary = async (url) => {
    try {
      if (!validateUrl(url)) { // URL 객체를 생성할 수 없다면
        alert(url + '는 유효한 url이 아닙니다.');
        throw new Error("유효한 url이 아닙니다."); // 에러 발생
      }
      setErrorMessage("");
      setIsLoading(true);
      const text = await fetchPageText(url); // 웹사이트 html 본문 크롤링
      const parsed = await fetchSummary({ url, text, selectedLength }); // ai에게 요약 요청

      setLastUrl(url); // 성공하면 최근 요약한 글에 넣기
      setIsLoading(false);
      navigate("/summary", { state: { data: parsed } }); // 요약 페이지로 이동
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setErrorMessage("페이지 접속 권한이 없습니다."); // 실패시 예외 메시지 표시
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
        <PostInput summary={summary} /> {/* url 입력받는 컴포넌트 */}
        <Option value={selectedLength} onChange={setSelectedLength} /> {/* 요약 길이 옵션 컴포넌트 */}
        <RecentPost newUrl={lastUrl} /> {/* 최근 요약한 글 (5개) 컴포넌트 */}
      </div>

      {(isLoading || errorMessage) && ( // 로딩 중이거나 에러가 있을 때 팝업 띄우기
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
            {!errorMessage ? ( // 에러 메시지가 아닐 때 (로딩일 때), 로딩중 텍스트와 프로그레스바 띄우기
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
            ) : ( // 에러 메시지일 때
              <>
                <div style={{ marginBottom: 12, fontSize: 16, color: "#e00" }}>
                  {errorMessage}
                </div>
                <button onClick={closeError} style={{ // 확인버튼 누르면 닫힘
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
