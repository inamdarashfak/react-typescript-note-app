import React, { useState, useEffect } from "react";
import { Note } from "../types";
import "../styles.css";

type Props = {
  note: Note | null;
  onSave: (updated: Note) => void;
};

const NoteEditor: React.FC<Props> = ({ note, onSave }) => {
  const [draft, setDraft] = useState<Note | null>(note);

  useEffect(() => {
    setDraft(note);
  }, [note]);

  if (!draft) return <div className="editor">Select or create a note</div>;

  return (
    <div className="editor">
      <input
        type="text"
        placeholder="Title..."
        value={draft.title}
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
      />
      <textarea
        placeholder="Write your note..."
        value={draft.content}
        onChange={(e) => setDraft({ ...draft, content: e.target.value })}
      />
      <button className="save-btn" onClick={() => onSave(draft)}>
        💾 Save
      </button>
    </div>
  );
};

export default NoteEditor;
