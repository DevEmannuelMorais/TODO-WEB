import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodoTitle,
  toggleTodoDone,
  deleteTodo,
} from "../api/todoApi";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [isDark, setIsDark] = useDarkMode();


  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    setLoading(true);
    const res = await getTodos();
    setTodos(res.data);
    setLoading(false);
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
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) return;
    await deleteTodo(id);
    loadTodos();
  }

  async function handleEditSave() {
    if (!editingTitle.trim()) return;
    await updateTodoTitle(editingId, editingTitle);
    setEditingId(null);
    setEditingTitle("");
    loadTodos();
  }

  function startEdit(todo) {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingTitle("");
  }

  function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // Verifica se o usuário já escolheu algo
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";

    // Se não, pega a preferência do sistema
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return [isDark, setIsDark];
}

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-2xl shadow-lg">
      <button
        onClick={() => setIsDark(!isDark)}
        className="absolute top-4 right-4 px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded"
      >
        {isDark ? "☀️" : "🌙"}
      </button>
      <h1 className="text-2xl font-bold text-center mb-6">📝 ToDo List</h1>

      {/* Campo de adicionar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nova tarefa..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Adicionar
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center py-2"
            >
              {editingId === todo.id ? (
                <div className="flex flex-1 gap-2">
                  <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="flex-1 border px-2 py-1 rounded"
                  />
                  <button
                    onClick={handleEditSave}
                    className="bg-green-500 text-white px-2 rounded hover:bg-green-600"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <span
                    className={`flex-1 ${todo.done ? "line-through text-gray-400" : ""
                      }`}
                  >
                    {todo.title}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => handleToggle(todo)}>
                      <FaCheck
                        className={`${todo.done ? "text-green-500" : "text-gray-400"
                          }`}
                      />
                    </button>
                    <button onClick={() => startEdit(todo)}>
                      <FaEdit className="text-blue-400" />
                    </button>
                    <button onClick={() => handleDelete(todo.id)} className="hover:scale-110 transition-transform">
                      <FaTrash className="text-red-500" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {!loading && todos.length === 0 && (
        <p className="text-center text-gray-400 mt-4">
          Nenhuma tarefa ainda 🚀
        </p>
      )}
    </div>
  );
}
