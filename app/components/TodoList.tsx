"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import type { Todo } from "../page";
import TodoFilter from "./TodoFilter";
import TodoItem from "./TodoItem";
import styles from './TodoList.module.scss';


interface TodoListProps {
  initialTodos: Todo[];
}

type FilterType = "All" | "Active" | "Completed";

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("todos");

      if (stored) {
        setTodos(JSON.parse(stored));
      } else {
        setTodos(initialTodos);
      }
    }
  }, [initialTodos]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const handleAddTask = () => {
    const trimmed = newTaskTitle.trim();

    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now(),
      title: trimmed,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setNewTaskTitle("");
  };

  const handleDeleteTask = (id: number | string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id: number | string) => {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updated);
  };

  const [filter, setFilter] = useState<FilterType>("All");

  const FILTER_MAP = {
    All: (todo: Todo) => true,
    Active: (todo: Todo) => !todo.completed,
    Completed: (todo: Todo) => todo.completed,
  };

  const filteredTodos = todos.filter(FILTER_MAP[filter]);

  return (
    <div>
      <TodoFilter filter={filter} setFilter={setFilter} />

      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleCompleted={toggleCompleted}
            deleteTask={handleDeleteTask}
          />
        ))}
      </ul>

      <div className={styles.addTaskContainer}>
        <input
          type="text"
          placeholder="Новая задача"
          value={newTaskTitle}
          onChange={handleInputChange}
          className={styles.addTaskInput}
        />
        <button className={styles.addTaskButton} onClick={handleAddTask}>
          Добавить
        </button>
      </div>

      <div className={styles.activeCount}>
        Активных задач: {todos.filter((todo) => !todo.completed).length}
      </div>
    </div>
  );
}
