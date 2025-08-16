// server/server.js
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());


let tasks = [];


app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

//add task
app.post("/api/tasks", (req, res) => {
  const { text } = req.body;
  const newTask = { id: Date.now(), text, completed: false };
  tasks.push(newTask);
  res.json(newTask);
});

//update task
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  tasks = tasks.map(task =>
    task.id == id ? { ...task, text, completed } : task
  );

  res.json({ success: true });
});

//delete task
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id != id);
  res.json({ success: true });
});


app.listen(PORT, () => {
  console.log(`✅ Express server running on http://localhost:${PORT}`);
});
