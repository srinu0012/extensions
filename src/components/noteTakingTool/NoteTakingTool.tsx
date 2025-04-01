import { useState, useEffect } from "react";

const NoteTakingTool = () => {
  const [url, setUrl] = useState("");
  const [newLocalNote, setNewLocalNote] = useState("");
  const [displayLocalNotes, setDisplayLocalNotes] = useState([]);
  const [globalNotes, setGlobalNotes] = useState<string[]>([]);
  const [newGlobalNote, setNewGlobalNote] = useState("");

  const getLocalNotes = () => {
    chrome.runtime.sendMessage({ action: "getPageUrl" }, (response) => {
      setUrl(response);
      chrome.storage.local.get("localNotes", (data) => {
        setDisplayLocalNotes(data.localNotes[response]);
      });
    });
  };

  const getGlobalNotes = () => {
    chrome.storage.local.get("globalNotes", (data) => {
      setGlobalNotes(data.globalNotes);
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
    getLocalNotes();
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
    getLocalNotes();
  };

  const handleGlobalNoteAdd = async () => {
    if (!newGlobalNote.trim()) return;
    await chrome.runtime.sendMessage({
      action: "saveGlobalNote",
      note: newGlobalNote,
    });
    setNewGlobalNote("");
    getGlobalNotes();
  };

  const handleGlobalDelete = async (index: number) => {
    await chrome.runtime.sendMessage(
      {
        action: "deleteSingleGlobalNote",
        index,
      },
      () => {
        getGlobalNotes();
      }
    );
  };

  return (
    <div className="popupContainer">
      <h2>Smart Notes</h2>

      <h3>Local Note (For this page)</h3>
      <textarea
        value={newLocalNote}
        onChange={(e) => setNewLocalNote(e.target.value)}
      />
      <button onClick={handleLocalSave}>Save</button>
      <button onClick={handleLocalDeleteAll}>DeleteAll</button>
      <ul>
        {displayLocalNotes?.map((note, ind) => (
          <div key={ind}>
            <li key={ind}>{note}</li>
            <button onClick={() => handleLocalDeleteSingleNote(ind)}>X</button>
          </div>
        ))}
      </ul>

      <h3>Global Notes</h3>
      <textarea
        value={newGlobalNote}
        onChange={(e) => setNewGlobalNote(e.target.value)}
      />
      <button onClick={handleGlobalNoteAdd}>Add</button>

      <ul>
        {globalNotes?.map((note, index) => (
          <li key={index}>
            {note} <button onClick={() => handleGlobalDelete(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteTakingTool;
