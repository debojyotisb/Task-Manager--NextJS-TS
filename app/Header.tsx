"use client";

import React, { useState } from "react";
import "./globals.css";

function Header() {
  const [task, setTask] = useState<string>("");        // Current input
  const [items, setItems] = useState<string[]>([]);    // Task list

  // Update input field
  const handleChange = (value: string) => {
    setTask(value);
  };

  // Add a new task
  const addTask = () => {
    if (!task.trim()) return; // Prevent empty tasks
    setItems((prev) => [...prev, task.trim()]);
    setTask("");
  };

  // Delete a task
  const deleteTask = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Edit a task (load into input & remove from list)
  const editTask = (index: number) => {
    setTask(items[index]);
    deleteTask(index);
  };

  return (
    <main className="container mx-auto p-4">
      <div className="bg-sky-700 rounded-2xl p-4 text-center">
        <h1 className="text-2xl font-bold text-white">Task Manager</h1>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Add Your Task Here..."
          className="p-2 flex-1 bg-blue-200 hover:bg-blue-300 rounded"
          value={task}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button
          type="button"
          className="bg-sky-500 hover:bg-sky-700 text-white px-4 py-2 rounded"
          onClick={addTask}
        >
          Save
        </button>
      </div>

      <ul className="bg-sky-900 rounded-2xl mt-4 p-4 divide-y divide-slate-800">
        {items.map((value, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-1 text-white"
          >
            <span className="truncate">• {value}</span>
            <div className="flex gap-2">
              <button onClick={() => editTask(index)}>✏️</button>
              <button onClick={() => deleteTask(index)}>⛔</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Header;
