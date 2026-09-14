import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Todo() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  function handleTask() {
    if (input.trim() === "") {
      alert("Please add a task first!");
      return;
    }

    const isDuplicate = tasks.some(
      (task) => task.text.toLowerCase() === input.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert("This task is already in your list!");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: input,
    };

    setTasks([newTask, ...tasks]);
    setInput("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleTask();
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditInput(task.text);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditInput("");
  }

  function saveEdit(id) {
    if (editInput.trim() === "") return;

    const taskToUpdate = tasks.find((task) => task.id === id);
    const updatedTask = { ...taskToUpdate, text: editInput };
    const otherTasks = tasks.filter((task) => task.id !== id);

    setTasks([updatedTask, ...otherTasks]);
    setEditingId(null);
    setEditInput("");
  }

  function handleEditKeyDown(e, id) {
    if (e.key === "Enter") saveEdit(id);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim().length >= 2 || search.trim().length === 0) {
        setDebouncedSearch(search);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const visibleTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="search-input"
      />

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button onClick={handleTask} className="add-button">
          Add
        </button>
      </div>

      {visibleTasks.length === 0 ? (
        <p className="empty-text">
          {tasks.length === 0 ? "No tasks yet. Add one above!" : "No tasks match your search."}
        </p>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => {
            if (task.id === editingId) {
              return (
                <li key={task.id} className="task-item">
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                    className="edit-input"
                  />
                  <div className="task-actions">
                    <button onClick={() => saveEdit(task.id)} className="save-button">
                      Save
                    </button>
                    <button onClick={cancelEdit} className="cancel-button">
                      Cancel
                    </button>
                  </div>
                </li>
              );
            }

            return (
              <li key={task.id} className="task-item">
                <span className="task-text">{task.text}</span>
                <div className="task-actions">
                  <button onClick={() => startEdit(task)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
