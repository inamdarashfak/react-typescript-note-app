import React, { useState, useEffect } from "react";
import { Note } from "./types";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";
import "./styles.css";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) {
      setNotes(JSON.parse(stored));
    }
  }, []);

  // Save notes to localStorage when notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleNew = () => {
    const now = new Date().toISOString();
    const newNote: Note = {
      id: Date.now().toString(),
      title: "",
      content: "",
      createdAt: now,
      updatedAt: now,
      pinned: false,
    };
    setNotes([newNote, ...notes]);
    setSelectedId(newNote.id);
  };

  const handleSave = (updated: Note) => {
    const exists = notes.some((note) => note.id === updated.id);

    if (exists) {
      setNotes(
        notes.map((note) =>
          note.id === updated.id
            ? { ...updated, updatedAt: new Date().toISOString() }
            : note
        )
      );
    } else {
      setNotes([
        {
          ...updated,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...notes,
      ]);
    }
    setSelectedId(null);
  };

  const handleTogglePin = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (id === selectedId) setSelectedId(null);
  };

  const selectedNote = notes.find((n) => n.id === selectedId) || null;

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="top-bar">
        <h2>📝 Notes App</h2>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
      <div className="content">
        <NoteList
          notes={notes}
          selectedId={selectedId}
          onSelect={handleSelect}
          onDelete={handleDelete}
          onNew={handleNew}
          onTogglePin={handleTogglePin}
        />
        <NoteEditor note={selectedNote} onSave={handleSave} />
      </div>
    </div>
  );
}

export default App;
