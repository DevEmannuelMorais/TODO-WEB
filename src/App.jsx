import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodoTitle,
  toggleTodoDone,
  deleteTodo,
} from "./api/todoApi";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    const res = await getTodos();
    console.log('teste')
    
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

  async function handleEdit() {
    if (!editingTitle.trim()) return;
    await updateTodoTitle(editingId, editingTitle);
    setEditingId(null);
    setEditingTitle("");
    loadTodos();
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
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem",
              borderBottom: "1px solid #ccc",
            }}
          >
            {editingId === todo.id ? (
              <>
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  style={{ flex: 1, marginRight: "0.5rem" }}
                />
                <button onClick={handleEdit}>Salvar</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.done ? "line-through" : "none",
                    flex: 1,
                  }}
                >
                  {todo.title}
                </span>
                <button onClick={() => handleToggle(todo)}>
                  <FaCheck color={todo.done ? "green" : "gray"} />
                </button>
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditingTitle(todo.title);
                  }}
                >
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(todo.id)}>
                  <FaTrash color="red" />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
