import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editedId, setEditedId] = useState(null);

  const handleAdd = () => {
    if (!input.trim()) return;

    if (editedId) {
      // Update item
      setItems((prev) =>
        prev.map((item) =>
          item.id === editedId ? { ...item, name: input } : item
        )
      );
      setEditedId(null);
    } else {
      // Add item
      const newItem = {
        id: Date.now(),
        name: input,
      };
      setItems((prev) => [...prev, newItem]);
    }

    setInput("");
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditedId(item.id);
    setInput(item.name);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>
          {editedId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="todo-list">
        {items.map((item) => (
          <li key={item.id} className="todo-item">
            <span>{item.name}</span>
            <div className="actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}