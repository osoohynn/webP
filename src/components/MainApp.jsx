import React, { useState } from "react";
import PostInput from "./PostInput"
import RecentPost from "./RecentPost"
import Option from "./Optoin";
import { useNavigate } from "react-router-dom";
import { fetchSummary } from "./GptService";
import { validateUrl, fetchPageText } from "./UrlService";

export default function MainApp() {
  const [selectedLength, setSelectedLength] = useState("300자 이내");
  const [lastUrl, setLastUrl]       = useState("");
  const navigate = useNavigate();

  const summary = async (url) => {
    try {
      if (!validateUrl(url)) {
        alert(url + '는 유효한 url이 아닙니다.')
        throw new Error("유효한 url이 아닙니다.")
      }
      const text = await fetchPageText(url);
      const parsed = await fetchSummary({ url, text, selectedLength });

      setLastUrl(url);
      navigate("/summary", { state: { data: parsed } });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{
      padding: 20,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1>URL 요약기</h1>
      <Option value={selectedLength} onChange={setSelectedLength} />
      <PostInput summary={summary} />
      <RecentPost newUrl={lastUrl} />
    </div>
  );
}