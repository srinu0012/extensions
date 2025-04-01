import { getHostName } from "../../utils/getHostName";

let activeHostName: string | null = null;
let startTime: number | null = null;
let siteTimes: Record<string, number> = {};

chrome.storage.local.get("siteTimes", (data) => {
  if (!data.siteTimes) return;
  siteTimes = data.siteTimes;
});

chrome.tabs.onActivated.addListener(() => {
  trackTime();
  updateActiveTab();
});

chrome.tabs.onUpdated.addListener(() => {
  trackTime();
  updateActiveTab();
});

export const updateActiveTab = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    activeHostName = getHostName(tabs[0].url);
    startTime = Date.now();
  });
};

export const trackTime = () => {
  if (!activeHostName || !startTime) return;
  const Time = Date.now() - startTime;
  siteTimes[activeHostName] = (siteTimes[activeHostName] || 0) + Time;
  chrome.storage.local.set({ siteTimes });
};

export const resetStats = () => {
  siteTimes = {};
  startTime = null;
  chrome.storage.local.set({ siteTimes });
};
