import React, { useState } from "react";
import PostInput from "./PostInput"
import RecentPost from "./RecentPost"
import Option from "./Optoin";
import OpenAI from "openai";
import Summary from "./Summary";

const GPT_KEY = import.meta.env.VITE_GPT_API_KEY

export default function MainApp() {
  const [selectedLength, setSelectedLength] = useState("short");
  const [result, setResult] = useState("");

  const summary = async (url) => {
    try {
      const proxyURL = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const resp     = await fetch(proxyURL);
      if (!resp.ok) throw new Error("페이지를 불러올 수 없음");
      const html     = await resp.text();

      const text = html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ");

      const openai = new OpenAI({
        apiKey: GPT_KEY,
        dangerouslyAllowBrowser: true,
      });
      const { choices } = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{
          role: "user",
          content:
            `${url}의 본문을 ${selectedLength} 글 분량으로 요약해줘.\n` +
            `텍스트: """${text}"""\n` +
            `결과는 JSON {"subject":"","summary":"","keywords":[""]} 형태로 줘.`
        }],
      });

      let result = choices[0].message.content;

      result = result
        .trim()
        .replace(/^```json\s*/, "")
        .replace(/```$/,"");

      let parsed;
      try {
        parsed = JSON.parse(result);
      } catch (e) {
        console.error("JSON 파싱 실패:", e, result);
        return setResult({
          subject: "파싱 오류",
          summary: result,
          keywords: [],
        });
      }
      setResult(parsed);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div style={{ padding: 20 }}>
      {!result ? (
        <>
          <h1>URL 요약기</h1>
          <Option
            value={selectedLength}
            onChange={setSelectedLength}
          />
          <PostInput summary={summary} />
        </>
      ) : (
        <Summary data={result} onReset={handleReset} />
      )}
    </div>
  );
}