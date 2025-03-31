import { groupTabs } from "./features/tabManager/groupTabs";
import { restoreSession } from "./features/tabManager/restoreSession";
import { saveSession } from "./features/tabManager/saveSession";

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "groupTabs") groupTabs();
  if (message.action === "saveSession") saveSession();
  if (message.action === "restoreSession") restoreSession();
});
