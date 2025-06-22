export function validateUrl(input) { // 유효한 url인지 검증
  try {
    new URL(input);
    return true;
  } catch {
    return false;
  }
}

export async function fetchPageText(url) {
  const proxyURL = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const resp = await fetch(proxyURL); // 페이지를 불러온 다음
  if (!resp.ok) throw new Error("페이지를 불러올 수 없습니다");
  const html = await resp.text(); // html을 추출

  return html // 스크립트 태그 제거
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ");
}