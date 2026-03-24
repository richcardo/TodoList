import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: todo,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 sm:mt-10 p-4 sm:p-6 border rounded-xl bg-white shadow-md">
      <h1 className="text-5xl mb-6">Todo List</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          className="border border-black rounded-sm p-2"
          type="text"
          placeholder="Activity"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />

        <button className="btn btn-primary" type="submit">
          +
        </button>
      </form>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`btn btn-sm ${filter === "all" ? "selected" : ""}`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`btn btn-sm ${filter === "active" ? "selected" : ""}`}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`btn btn-sm ${filter === "completed" ? "selected" : ""}`}
        >
          Completed
        </button>
      </div>

      {/* Lista */}
      <ul className="space-y-2">
        {filteredTodos.map((item) => (
          <li
            key={item.id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTodo(item.id)}
              />

              <span
                className={item.completed ? "line-through text-gray-400" : ""}
              >
                {item.text}
              </span>
            </div>

            <button
              onClick={() => deleteTodo(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
