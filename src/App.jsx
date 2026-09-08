import { useState } from "react";
import Navbar from "./Navbar"; 
export default function App() {

  const [page, setPage] = useState("home");
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");

  function addTask() {
    if (input.trim() === "") return;

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

  function editTask(task) {
    setEditId(task.id);
    setEditInput(task.text);
  }

  function saveTask(id) {
    if (editInput.trim() === "") return;

    const task = tasks.find((task) => task.id === id);

    const updatedTask = {
      ...task,
      text: editInput,
    };

    setTasks([
      updatedTask,
      ...tasks.filter((task) => task.id !== id),
    ]);

    setEditId(null);
    setEditInput("");
  }

  function cancelEdit() {
    setEditId(null);
    setEditInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addTask();
    }
  }
  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="task-input"
        />

        <button onClick={addTask} className="add-button">
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-text">No tasks yet. Add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    className="task-input"
                  />

                  <button
                    onClick={() => saveTask(task.id)}
                    className="edit-button"
                  >
                    Save
                  </button>

                  <button
                    onClick={cancelEdit}
                    className="delete-button"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{task.text}</span>

                  <button
                    onClick={() => editTask(task)}
                    className="edit-button"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}