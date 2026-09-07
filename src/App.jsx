import { useState } from 'react'
import './App.css'
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  function addTodo() {
    if (todo.trim() === "") return;
    if(todos.includes(todo)) {
      alert("Todo already exists!");
      return;
    }
    setTodos(todos.concat(todo));
    setTodo("");
  }

  function deleteTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h1>Todo App</h1>

      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTodo(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;