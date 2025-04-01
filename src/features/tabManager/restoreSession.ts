export const restoreSession = () => {
  chrome.storage.local.get("savedSession", (data) => {
    if (data.savedSession) {
      data.savedSession.forEach((tab: { url: string }) => {
        chrome.tabs.create({ url: tab.url });
      });
    }
  });
};
