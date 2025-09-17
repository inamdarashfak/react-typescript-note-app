import React, { useState } from "react";
import { Note } from "../types";
import NoteItem from "./NoteItem";

type Props = {
  notes: Note[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
  onTogglePin: (id: string) => void;
};

const NoteList: React.FC<Props> = ({
  notes,
  selectedId,
  onSelect,
  onDelete,
  onNew,
  onTogglePin,
}) => {
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter((n) => n.pinned);
  const otherNotes = filteredNotes.filter((n) => !n.pinned);

  return (
    <div className="note-list">
      <button onClick={onNew}>➕ New Note</button>
      <input
        type="text"
        placeholder="🔍 Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {pinnedNotes.length > 0 && (
        <>
          <h4 className="section-title">📌 Pinned</h4>
          {pinnedNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onSelect={onSelect}
              onDelete={onDelete}
              onTogglePin={onTogglePin}
              isSelected={note.id === selectedId}
            />
          ))}
        </>
      )}

      {otherNotes.length > 0 && (
        <>
          <h4 className="section-title">🗂️ Others</h4>
          {otherNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onSelect={onSelect}
              onDelete={onDelete}
              onTogglePin={onTogglePin}
              isSelected={note.id === selectedId}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default NoteList;
