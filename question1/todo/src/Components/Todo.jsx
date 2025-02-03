import React, { useMemo } from "react";
import "../index.css";

const heavyTask = () => {
  let start = Date.now();
  while (Date.now() - start < 400) {} 
  return true;
};

const Todo = React.memo(({ todo, deleteTodo }) => {
  const isHeavyTaskDone = useMemo(() => heavyTask(), [todo]);

  return (
    <div className="todo-item">
      <span>{todo.task}</span>
      <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
    </div>
  );
});

export default Todo;
