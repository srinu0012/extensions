export const saveSession = () => {
  chrome.tabs.query({}, (tabs) => {
    const session = tabs.map((tab) => {
      return { url: tab.url };
    });
    chrome.storage.local.set({ savedSession: session });
  });
};
