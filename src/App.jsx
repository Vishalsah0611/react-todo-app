import { useState } from "react";

export default function App() {

  const [tasks, setTasks] = useState([]);
  
  const [input, setInput] = useState("");

  const [currentTaskId, setCurrentTaskId] = useState(null);


  function handleTask(isUpdate) {
    if (input.trim() === "") return; 

    if(isUpdate && currentTaskId !== null){
      const updatedTasks = tasks.map((task) => {
        if(task.id === currentTaskId){
          return { ...task, text: input };
        }
        return task;
      })
      setTasks(updatedTasks);
      setInput("");
      setCurrentTaskId(null);
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
    if (e.key === "Enter") handleTask(isUpdate);
  }

  function updateTask(id){
    const task = tasks.filter((task) => task.id === id)[0];
    setInput(task.text);
    setCurrentTaskId(id);
  }

  const isUpdate = tasks.some((task) => task.id === currentTaskId);

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button onClick={() => handleTask(isUpdate)} className="add-button">
          {isUpdate ? "Update" : "Add"}
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-text">No tasks yet. Add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{task.text}</span>
               <button
                onClick={() => updateTask(task.id)}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}