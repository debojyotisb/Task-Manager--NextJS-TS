"use client";

import React from "react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

export default function TaskApp() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [input, setInput] = React.useState("");
  const [editingId, setEditingId] = React.useState<string | null>(null);

  //task load
  React.useEffect(() => {
    fetch("http://localhost:4000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error loading tasks:", err));
  }, []);


  const addTask = async (title: string) => {
    const t = title.trim();
    if (!t) return;

    const newTask = { title: t };

    const res = await fetch("http://localhost:4000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const saved = await res.json();
    setTasks((prev) => [saved, ...prev]);
    setInput("");
  };


  const updateTask = async (id: string, title: string) => {
    const t = title.trim();
    if (!t) return cancelEdit();

    const res = await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: t }),
    });

    const updated = await res.json();
    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    cancelEdit();
  };

 
  const removeTask = async (id: string) => {
    await fetch(`http://localhost:4000/api/tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

 
  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const res = await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    });

    const updated = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setInput(task.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setInput("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) updateTask(editingId, input);
    else addTask(input);
  };

  return (
    <section className="rounded-2xl shadow-lg bg-white/70 dark:bg-slate-800/60 backdrop-blur p-4 sm:p-6">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Task Manager</h1>
        <span className="text-sm opacity-70">{tasks.length} task{tasks.length !== 1 ? "s" : ""}</span>
      </header>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add your task…"
          className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 dark:bg-slate-900 dark:border-slate-700"
        />
        {editingId ? (
          <>
            <button type="submit" className="rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-400">Save</button>
            <button type="button" onClick={cancelEdit} className="rounded-xl px-4 py-2 bg-slate-600 text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-400">Cancel</button>
          </>
        ) : (
          <button type="submit" className="rounded-xl px-4 py-2 bg-sky-600 text-white hover:bg-sky-700 focus:ring-2 focus:ring-sky-400">Add</button>
        )}
      </form>

      <ul className="mt-4 divide-y divide-slate-200 dark:divide-slate-700">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center gap-3 py-3">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
              className="h-5 w-5 accent-sky-600"
              aria-label="Toggle complete"
            />
            <span className={`flex-1 text-slate-800 dark:text-slate-100 ${t.completed ? "line-through opacity-60" : ""}`}>
              {t.title}
            </span>
            <button onClick={() => startEdit(t)} className="rounded-lg px-3 py-1 text-sm bg-amber-500 text-white hover:bg-amber-600 focus:ring-2 focus:ring-amber-300" aria-label="Edit">
              Edit
            </button>
            <button onClick={() => removeTask(t.id)} className="rounded-lg px-3 py-1 text-sm bg-rose-600 text-white hover:bg-rose-700 focus:ring-2 focus:ring-rose-300" aria-label="Delete">
              Delete
            </button>
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="py-6 text-center text-sm opacity-70">No tasks yet. Add one above.</li>
        )}
      </ul>
    </section>
  );
}
