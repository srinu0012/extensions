import { getHostName } from "../../utils/getHostName";

let activeTabId: number | null = null;
let activeHostName: string | null = null;
let startTime: number | null = null;
export let siteTimes: Record<string, number> = {};

export const resetStats = () => {
  siteTimes = {};
  chrome.storage.local.set({ siteTimes });
};

chrome.tabs.onActivated.addListener(({ tabId }) => {
  trackTime();
  activeTabId = tabId;
  updateActiveTab();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (tabId === activeTabId && changeInfo.url) {
    trackTime();
    updateActiveTab();
  }
});

export const updateActiveTab = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    activeTabId = tabs[0].id!;
    activeHostName = getHostName(tabs[0].url);
    startTime = Date.now();
  });
};

export const trackTime = () => {
  if (!activeHostName || !startTime) return;
  const Time = Date.now() - startTime;
  console.log(Time);

  siteTimes[activeHostName] = (siteTimes[activeHostName] || 0) + Time;
  startTime = Date.now();
  chrome.storage.local.set({ siteTimes });
};
