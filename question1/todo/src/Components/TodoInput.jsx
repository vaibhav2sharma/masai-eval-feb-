import React, { useState } from "react";
import "../index.css";
const TodoInput = ({ addTodo }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTodo(task);
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a todo"
        className="todo-input"
      />
      <button type="submit" className="todo-button">Add</button>
    </form>
  );
};

export default TodoInput;
