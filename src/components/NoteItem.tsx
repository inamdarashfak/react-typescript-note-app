import React from "react";
import { Note } from "../types";

type Props = {
  note: Note;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  isSelected: boolean;
};

const NoteItem: React.FC<Props> = ({
  note,
  onSelect,
  onDelete,
  onTogglePin,
  isSelected,
}) => {
  return (
    <div
      className={`note-item ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(note.id)}
    >
      <div>
        <h4>{note.title || "Untitled"}</h4>
        <small>{new Date(note.updatedAt).toLocaleString()}</small>
      </div>
      <div className="note-actions">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(note.id);
          }}
        >
          {note.pinned ? "📌" : "📍"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
