import { useState, useEffect } from "react";
import OpenAI from "openai";

const GPT_KEY = import.meta.env.VITE_GPT_API_KEY;

export function useSelectionDefinition() {
  const [selectedText, setSelectedText] = useState(""); // 선택된 텍스트
  const [definition, setDefinition] = useState(""); // 정의, 뜻
  const [pos, setPos] = useState({ x: 0, y: 0 }); // 포지션 구하기
  const [show, setShow] = useState(false); // 보이기 true or false

  useEffect(() => {
    const handler = async (e) => {
      // 선택된 텍스트 가져오기
      const sel = window.getSelection()?.toString().trim(); // 드래그 셀렉션
      if (!sel) return; // 선택되지 않았으면 넘어감

      const range = window.getSelection().getRangeAt(0);
      const rect  = range.getBoundingClientRect();
      setPos({ x: rect.right + window.scrollX, y: rect.bottom + window.scrollY }); // 팝업 띄울 위치 계산
      setSelectedText(sel);
      setDefinition("뜻 찾는 중…");
      setShow(true);

      try { // gpt에게 뜻 요청
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
    return () => document.removeEventListener("mouseup", handler); // mouseup 이벤트 삭제
  }, []);
  return { selectedText, definition, pos, show, setShow };
}
