import { groupTabs } from "./features/tabManager/groupTabs.feature";
import { restoreSession } from "./features/tabManager/restoreSession";
import { saveSession } from "./features/tabManager/saveSession";
import {
  resetStats,
  siteTimes,
} from "./features/productivityTracker/productivityTracker.feature";
import {
  saveGlobalNote,
  getGlobalNotes,
  deleteSingleGlobalNote,
} from "./features/noteTakingTool/globalNotes.feature";
import {
  saveLocalNote,
  getLocalNote,
  deleteLocalNote,
  deleteSingleLocalNote,
} from "./features/noteTakingTool/localNotes.feature";
import { getHostName } from "./utils/getHostName";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "groupTabs") groupTabs();
  if (message.action === "saveSession") saveSession();
  if (message.action === "restoreSession") restoreSession();
  if (message.action === "getStats") {
    sendResponse(siteTimes);
    return true;
  }
  if (message.action === "resetStats") resetStats();
  if (message.action === "getPageUrl") {
    chrome.tabs.query({ active: true }, (tabs) => {
      const hostName = getHostName(tabs[0].url);
      sendResponse(hostName);
    });
    return true;
  }
  if (message.action === "saveLocalNote") {
    saveLocalNote(message.url, message.note);
  }
  if (message.action === "deleteLocalNote") {
    deleteLocalNote(message.url);
  }
  if (message.action === "getLocalNote") {
    const localNotes = getLocalNote(message.url);
    sendResponse(localNotes);
    return true;
  }
  if (message.action == "deleteSingleLocalNote") {
    deleteSingleLocalNote(message.url, message.index);
  }
  if (message.action == "deleteSingleGlobalNote") {
    deleteSingleGlobalNote(message.index);
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "saveGlobalNote") {
    saveGlobalNote(message.note);
  }
  if (message.action === "getGlobalNotes") {
    getGlobalNotes(sendResponse);
    return true;
  }
});
