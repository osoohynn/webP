import React, { useState, useEffect } from "react";
import Favicon from "./Favicon";

export default function RecentPost({ newUrl }) {
  const [urls, setUrls] = useState(() => {
    const saved = localStorage.getItem("recentUrls"); // 로컬스토리지에서 저장된 최근 url을 가져옴
    return saved ? JSON.parse(saved) : []; // 만약 로컬스토리지에 저장된 값이 null이 아니라면 json으로 파싱, 아니면 빈배열로 state 초기화
  });

  useEffect(() => {
    if (!newUrl) return; // 새로운 url이 없으면 작동 방지
    setUrls(prev => {
      const deduped = [newUrl, ...prev.filter(u => u !== newUrl)].slice(0, 5); // 새로운 글 요약 후 최근 url 중복 제거 및 새로운 글 url을 최근 url에 추가
      localStorage.setItem("recentUrls", JSON.stringify(deduped)); // 가공한 새로운 데이터 로컬 스토리지에 저장
      return deduped; // state 업데이트
    });
  }, [newUrl]);

  if (urls.length === 0) return null; // url의 길이가 0이면 컴포넌트 렌더링 안함

  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ fontSize: 20, marginBottom: 8, fontWeight: 500 }}>최근 요약한 글</div>
      <ul style={{ listStyle: "none", padding: 0, 
                  display: "flex", flexDirection: "column", 
                  alignItems: "center" }}>
        {urls.map((url, idx) => (
          <li key={url} style={{
            border: "1px solid #ddd",
            borderRadius: 100,
            padding: 8,
            paddingTop: 4,
            paddingBottom: 4,
            marginBottom: 10,
            maxWidth: 300,
            overflow: "hidden",
            width: "min-content",
            color: "#888",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>
            <Favicon domain={url} />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "#888",
                fontSize: 14,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {url}
            </a>
          </li>
          
        ))}
      </ul>
    </div>
  );
}