import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

function TodoProvider({ children }) {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");

        if (savedTodos) {
            return JSON.parse(savedTodos);
        }

        return [];
    });

    // Save todos whenever todos change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // Add Todo
    const addTodo = (todo) => {
        const newTodo = {
            id: Date.now(),
            title: todo.title,
            description: todo.description,
            date: todo.date,
            priority: todo.priority,
            important: todo.important,
            completed: false
        };

        setTodos((previousTodos) => [...previousTodos, newTodo]);
    };

    // Delete Todo
    const deleteTodo = (id) => {
        setTodos((previousTodos) =>
            previousTodos.filter((todo) => todo.id !== id)
        );
    };

    // Complete / Incomplete
    const toggleComplete = (id) => {
        setTodos((previousTodos) =>
            previousTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    // Important / Not Important
    const toggleImportant = (id) => {
        setTodos((previousTodos) =>
            previousTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, important: !todo.important }
                    : todo
            )
        );
    };

    // Edit Todo
    const editTodo = (id, updatedTodo) => {
        setTodos((previousTodos) =>
            previousTodos.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        title: updatedTodo.title,
                        description: updatedTodo.description,
                        date: updatedTodo.date,
                        priority: updatedTodo.priority,
                        important: updatedTodo.important
                    }
                    : todo
            )
        );
    };

    return (
        <TodoContext.Provider
            value={{
                todos,
                addTodo,
                deleteTodo,
                toggleComplete,
                toggleImportant,
                editTodo
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}

export default TodoProvider;