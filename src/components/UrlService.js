export function validateUrl(input) {
  try {
    new URL(input);
    return true;
  } catch {
    return false;
  }
}

export async function fetchPageText(url) {
  const proxyURL = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const resp = await fetch(proxyURL);
  if (!resp.ok) throw new Error("페이지를 불러올 수 없습니다");
  const html = await resp.text();

  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ");
}