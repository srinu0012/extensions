export const getHostName = (url: string | undefined): string | null => {
  if (!url) return null;
  return new URL(url).hostname;
};
