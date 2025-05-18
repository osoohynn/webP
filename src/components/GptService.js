import OpenAI from "openai";
const GPT_KEY = import.meta.env.VITE_GPT_API_KEY;

export async function fetchSummary({ text, selectedLength }) {
  const openai = new OpenAI({
    apiKey: GPT_KEY,
    dangerouslyAllowBrowser: true,
  });
  const { choices } = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      role: "user",
      content: 
        `텍스트: """${text}"""\n` +
        `이 글을 ${selectedLength} 글 분량으로 한국어로 요약해줘.\n` +
        `결과는 JSON {"subject":"","summary":"","keywords":[""]} 형태로 줘.`
    }],
  });
  let result = choices[0].message.content
    .trim()
    .replace(/^```json\s*/, "")
    .replace(/```$/,"");
  try {
    return JSON.parse(result);
  } catch {
    throw new Error("JSON 파싱 실패");
  }
}