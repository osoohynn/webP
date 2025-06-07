import React, { useState, useEffect } from "react";
import Favicon from "./Favicon";

export default function RecentPost({ newUrl }) {
  const [urls, setUrls] = useState(() => {
    const saved = localStorage.getItem("recentUrls");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!newUrl) return;
    setUrls(prev => {
      const deduped = [newUrl, ...prev.filter(u => u !== newUrl)].slice(0, 5);
      localStorage.setItem("recentUrls", JSON.stringify(deduped));
      return deduped;
    });
  }, [newUrl]);

  if (urls.length === 0) return null;

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