import React, { useState, useCallback } from "react";
import TodoInput from "./TodoInput";
import Todo from "./Todo";
import "../index.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((task) => {
    setTodos((prevTodos) => [...prevTodos, { id: Date.now(), task }]);
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  return (
    <div className="todo-container">
      <TodoInput addTodo={addTodo} />
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
