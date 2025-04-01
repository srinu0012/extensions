export const saveGlobalNote = (note: string) => {
  chrome.storage.local.get(["globalNotes"], (data) => {
    const globalNotes = data.globalNotes || [];
    globalNotes.push(note);
    chrome.storage.local.set({ globalNotes });
  });
};

export const getGlobalNotes = (callback: (notes: string[]) => void) => {
  chrome.storage.local.get(["globalNotes"], (data) => {
    callback(data.globalNotes || []);
  });
};

export const deleteSingleGlobalNote = (index: number) => {
  chrome.storage.local.get("globalNotes", (data) => {
    const filterNotes = data.globalNotes?.filter(
      (_note: string, i: number) => i != index
    );

    chrome.storage.local.set({
      globalNotes: filterNotes,
    });
  });
};
