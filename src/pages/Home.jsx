import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodoTitle,
  toggleTodoDone,
  deleteTodo,
} from "../api/todoApi";
import TodoItem from "../components/TodoItem";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    const res = await getTodos();
    setTodos(res.data);
  }

  async function handleAdd() {
    if (!newTitle.trim()) return;
    await createTodo(newTitle);
    setNewTitle("");
    loadTodos();
  }

  async function handleToggle(todo) {
    await toggleTodoDone(todo.id, !todo.done);
    loadTodos();
  }

  async function handleDelete(id) {
    await deleteTodo(id);
    loadTodos();
  }

  async function handleEdit(todo) {
    const newTitle = prompt("Novo título:", todo.title);
    if (newTitle) {
      await updateTodoTitle(todo.id, newTitle);
      loadTodos();
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>📝 ToDo List</h1>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nova tarefa..."
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={handleAdd}>Adicionar</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
