export const saveLocalNote = (url: string, note: string) => {
  chrome.storage.local.get("localNotes", (data) => {
    const localNotes = data.localNotes || {};
    console.log(url);
    localNotes[url] = note;
    chrome.storage.local.set({ localNotes });
  });
};

export const getLocalNote = (url: string) => {
  console.log(url);
  chrome.storage.local.get("localNotes", (data) => {
    console.log(data.localNotes.url);
    return data.localNotes.url || {};
  });
  return "hi";
};

export const deleteLocalNote = (url: string) => {
  chrome.storage.local.get(["localNotes"], (data) => {
    const localNotes = data.localNotes || {};
    delete localNotes[url];
    chrome.storage.local.set({ localNotes });
  });
};
