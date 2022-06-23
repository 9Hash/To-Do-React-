import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      const todosObj = JSON.parse(localStorage.getItem("todos"));
      if (todosObj && todosObj.todoList) {
        setTodos(todosObj.todoList);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify({ todoList: todos }));
  }, [JSON.stringify(todos)]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id, isComplete) => {
    if (!isComplete) {
      const todoCompleted = [],
        todoIncomplete = [];
      todos.forEach((todo) => {
        if (todo.id === id) {
          todo.isComplete = true;
          todoCompleted.unshift(todo);
        } else {
          if (todo.isComplete) {
            todoCompleted.push(todo);
          } else {
            todoIncomplete.push(todo);
          }
        }
      });
      setTodos([...todoIncomplete, ...todoCompleted]);
    }
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
