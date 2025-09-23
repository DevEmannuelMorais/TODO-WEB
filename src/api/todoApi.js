import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // tua API Node
});

export const getTodos = () => api.get("/todos");
export const createTodo = (title) => api.post("/todos", { title });
export const updateTodoTitle = (id, title) => api.put(`/todos/${id}`, { title });
export const toggleTodoDone = (id, done) => api.patch(`/todos/${id}/done`, { done });
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
