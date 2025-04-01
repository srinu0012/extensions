import { useState, useEffect } from "react";

const NoteTakingTool = () => {
  const [url, setUrl] = useState("");
  const [localNote, setLocalNote] = useState("");
  const [localNotes, setLocalNotes] = useState({});
  const [globalNotes, setGlobalNotes] = useState<string[]>([]);
  const [newGlobalNote, setNewGlobalNote] = useState("");

  console.log(localNote, "<<<<<<local note from react notetakingtool");

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getPageUrl" }, (response) => {
      setUrl(response);
      chrome.storage.local.get("localNotes", (data) => {});
    });

    chrome.runtime.sendMessage({ action: "getGlobalNotes" }, setGlobalNotes);
  }, []);

  const handleLocalSave = () => {
    chrome.runtime.sendMessage({
      action: "saveLocalNote",
      url,
      note: localNote,
    });
    console.log(url, "<<<<<form react note taking tool");
    setLocalNote("");
  };

  const handleLocalDelete = () => {
    chrome.runtime.sendMessage({ action: "deleteLocalNote", url });
    setLocalNote("");
  };

  const handleGlobalSave = () => {
    if (!newGlobalNote.trim()) return;
    chrome.runtime.sendMessage({
      action: "saveGlobalNote",
      note: newGlobalNote,
    });
    setNewGlobalNote("");
  };

  const handleGlobalDelete = (index: number) => {
    chrome.runtime.sendMessage({ action: "deleteGlobalNote", index });
    setGlobalNotes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="popupContainer">
      <h2>Smart Notes</h2>

      <h3>Local Note (For this page)</h3>
      <textarea
        value={localNote}
        onChange={(e) => setLocalNote(e.target.value)}
      />
      <button onClick={handleLocalSave}>Save</button>
      <button onClick={handleLocalDelete}>Delete</button>

      <h3>Global Notes (Accessible Anywhere)</h3>
      <textarea
        value={newGlobalNote}
        onChange={(e) => setNewGlobalNote(e.target.value)}
      />
      <button onClick={handleGlobalSave}>Add</button>

      <ul>
        {globalNotes.map((note, index) => (
          <li key={index}>
            {note} <button onClick={() => handleGlobalDelete(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteTakingTool;
