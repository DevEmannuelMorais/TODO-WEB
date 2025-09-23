import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <span
        style={{
          textDecoration: todo.done ? "line-through" : "none",
          flex: 1,
        }}
      >
        {todo.title}
      </span>
      <button onClick={() => onToggle(todo)}>
        <FaCheck color={todo.done ? "green" : "gray"} />
      </button>
      <button onClick={() => onEdit(todo)}>
        <FaEdit />
      </button>
      <button onClick={() => onDelete(todo.id)}>
        <FaTrash color="red" />
      </button>
    </li>
  );
}
