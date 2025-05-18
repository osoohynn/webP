import React, { useState, useEffect } from "react";

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
    <div style={{ marginTop: 20 }}>
      <h2>최근 요약한 글</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {urls.map((url, idx) => (
          <li key={url} style={{
            border: "1px solid #ddd",
            borderRadius: 4,
            padding: 8,
            marginBottom: 6,
          }}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#007acc" }}
            >
              {url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}