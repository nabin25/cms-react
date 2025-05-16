export function calculateAverageReadTime(content: string) {
  const wordCount = content.length;
  const charactersPerMinute = 800;
  const readTime = Math.ceil(wordCount / charactersPerMinute);
  return readTime;
}
