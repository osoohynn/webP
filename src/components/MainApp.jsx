import React, { useState } from "react";
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
  const navigate = useNavigate();

  const summary = async (url) => {
    try {
      if (!validateUrl(url)) {
        alert(url + '는 유효한 url이 아닙니다.')
        throw new Error("유효한 url이 아닙니다.")
      }
      setIsLoading(true);
      const text = await fetchPageText(url);
      const parsed = await fetchSummary({ url, text, selectedLength });

      setLastUrl(url);
      setIsLoading(false);
      navigate("/summary", { state: { data: parsed } });
    } catch (e) {
      console.error(e);
    }
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
        maxWidth: 500
      }}>
        <h1>블로그 요약기</h1>
        <PostInput summary={summary} />
        <Option value={selectedLength} onChange={setSelectedLength} />
        <RecentPost newUrl={lastUrl} />
      </div>

      {
        isLoading && (
          <div style={{ 
            width: "100%", 
            height: "100vh", 
            position: "fixed", 
            background: "rgba(0,0,0,0.4)", 
            zIndex: 100000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
            color: "white"
          }}>
            로딩중...
          </div>
        )
      }
    </div>
    
  );
}