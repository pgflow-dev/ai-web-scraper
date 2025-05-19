export default async function scrapeWebsite(url: string) {
  console.log("[scrapeWebsite] fetching", url);

  const res = await fetch(url, {
    signal: AbortSignal.timeout(10000), // 10 second timeout
  });

  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

  const html = await res.text();
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return { content: text.slice(0, 25_000) }; // limit tokens
}
