import { useState, useEffect } from "react";

const NoteTakingTool = () => {
  const [url, setUrl] = useState("");
  const [newLocalNote, setNewLocalNote] = useState<string>("");
  const [displayLocalNotes, setDisplayLocalNotes] = useState<string[]>([]);
  const [displayGlobalNotes, setDisplayGlobalNotes] = useState<string[]>([]);
  const [newGlobalNote, setNewGlobalNote] = useState("");

  const getLocalNotes = () => {
    chrome.runtime.sendMessage({ action: "getPageHostName" }, (response) => {
      setUrl(response);
      chrome.storage.local.get("localNotes", (data) => {
        setDisplayLocalNotes(data.localNotes[response]);
      });
    });
  };

  const getGlobalNotes = () => {
    chrome.storage.local.get("globalNotes", (data) => {
      setDisplayGlobalNotes(data.globalNotes);
    });
  };

  useEffect(() => {
    getLocalNotes();
    getGlobalNotes();
  }, []);

  const handleLocalSave = async () => {
    await chrome.runtime.sendMessage({
      action: "saveLocalNote",
      url,
      note: newLocalNote,
    });
    setDisplayLocalNotes((state) => [...state, newLocalNote]);
    setNewLocalNote("");
  };

  const handleLocalDeleteAll = async () => {
    await chrome.runtime.sendMessage({ action: "deleteLocalNote", url });
    setNewLocalNote("");
    setDisplayLocalNotes([]);
  };

  const handleLocalDeleteSingleNote = async (index: number) => {
    await chrome.runtime.sendMessage({
      action: "deleteSingleLocalNote",
      url,
      index,
    });

    setDisplayLocalNotes((state) =>
      state.filter((_note, ind) => {
        return ind != index;
      })
    );
  };

  const handleGlobalNoteAdd = async () => {
    if (!newGlobalNote.trim()) return;
    await chrome.runtime.sendMessage({
      action: "saveGlobalNote",
      note: newGlobalNote,
    });

    setNewGlobalNote("");
    setDisplayGlobalNotes((state) => [...state, newGlobalNote]);
  };

  const handleGlobalDelete = (index: number) => {
    chrome.runtime.sendMessage({
      action: "deleteSingleGlobalNote",
      index,
    });

    setDisplayGlobalNotes((state) =>
      state.filter((_note, ind) => ind != index)
    );
  };

  return (
    <div className="popup-container">
      <h2>Smart Notes</h2>

      <h3>Local Note (For this page)</h3>
      <textarea
        value={newLocalNote}
        onChange={(e) => setNewLocalNote(e.target.value)}
      />

      <button onClick={handleLocalSave}>Save</button>
      <button onClick={handleLocalDeleteAll}>DeleteAll</button>

      <ul>
        {displayLocalNotes?.map((note, index) => (
          <li key={index}>
            {note}
            <button
              className="delete-btn"
              onClick={() => handleLocalDeleteSingleNote(index)}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <h3>Global Notes</h3>
      <textarea
        value={newGlobalNote}
        onChange={(e) => setNewGlobalNote(e.target.value)}
      />
      <button onClick={handleGlobalNoteAdd}>Add</button>

      <ul>
        {displayGlobalNotes?.map((note, index) => (
          <li key={index}>
            {note}
            <button
              className="delete-btn"
              onClick={() => handleGlobalDelete(index)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteTakingTool;
