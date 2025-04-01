import { groupTabs } from "./features/tabManager/groupTabs.feature";
import { restoreSession } from "./features/tabManager/restoreSession";
import { saveSession } from "./features/tabManager/saveSession";
import { resetStats } from "./features/productivityTracker/productivityTracker.feature";
import {
  saveGlobalNote,
  deleteSingleGlobalNote,
} from "./features/noteTakingTool/globalNotes.feature";
import {
  saveLocalNote,
  deleteLocalNote,
  deleteSingleLocalNote,
} from "./features/noteTakingTool/localNotes.feature";
import { getHostName } from "./utils/getHostName";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.action) {
    case "groupTabs":
      groupTabs();
      break;
    case "saveSession":
      saveSession();
      break;
    case "restoreSession":
      restoreSession();
      break;
    case "resetStats":
      resetStats();
      break;
    case "getPageHostName":
      chrome.tabs.query({ active: true }, (tabs) => {
        const hostName = getHostName(tabs[0].url);
        sendResponse(hostName);
      });
      return true;
    case "saveLocalNote":
      saveLocalNote(message.url, message.note);
      break;
    case "deleteAllLocalNote":
      deleteLocalNote(message.url);
      break;
    case "deleteSingleLocalNote":
      deleteSingleLocalNote(message.url, message.index);
      break;
    case "saveGlobalNote":
      saveGlobalNote(message.note);
      break;
    case "deleteSingleGlobalNote":
      deleteSingleGlobalNote(message.index);
      break;
    default:
      console.log(`${message.action} is not exist`);
  }
});
