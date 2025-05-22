import { useState, useEffect } from "react";
import OpenAI from "openai";

const GPT_KEY = import.meta.env.VITE_GPT_API_KEY;

export function useSelectionDefinition() {
  const [selectedText, setSelectedText] = useState("");
  const [definition, setDefinition] = useState("");
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = async (e) => {
      // 선택된 텍스트 가져오기
      const sel = window.getSelection()?.toString().trim();
      if (!sel) return;

      const range = window.getSelection().getRangeAt(0);
      const rect  = range.getBoundingClientRect();
      setPos({ x: rect.right + window.scrollX, y: rect.bottom + window.scrollY });
      setSelectedText(sel);
      setDefinition("뜻 찾는 중…");
      setShow(true);

      try {
        const openai = new OpenAI({
          apiKey: GPT_KEY,
          dangerouslyAllowBrowser: true,
        });
        const { choices } = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "당신은 훌륭한 사전 전문가입니다." },
            { role: "user", content: `"${sel}"의 의미를 간단히 한국어로 설명해줘.` }
          ],
        });
        const defText = choices[0].message.content.trim();
        setDefinition(defText);
      } catch (err) {
        console.error(err);
        setDefinition("정의를 얻어오지 못했습니다.");

      }
    };

    document.addEventListener("mouseup", handler);
    return () => document.removeEventListener("mouseup", handler);
  }, []);
  return { selectedText, definition, pos, show, setShow };
}
