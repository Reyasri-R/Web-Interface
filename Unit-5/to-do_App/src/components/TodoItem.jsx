import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function TodoItem({ todo, onEdit }) {

    const {
        deleteTodo,
        toggleComplete,
        toggleImportant
    } = useContext(TodoContext);

    return (
        <div
            className={`todo-item ${todo.completed ? "completed" : ""
                }`}
        >

            <div className="todo-content">

                <h3>
                    {todo.title}
                </h3>

                <p>
                    {todo.description}
                </p>

                <p>
                    📅 {todo.date}
                </p>

                <p>
                    Priority: <strong>{todo.priority}</strong>
                </p>

                <p>
                    Status:
                    {todo.completed ? " Completed" : " Pending"}
                </p>

            </div>

            <div className="todo-buttons">

                <button
                    onClick={() => toggleComplete(todo.id)}
                >
                    {todo.completed ? "Undo" : "Complete"}
                </button>

                <button
                    onClick={() => toggleImportant(todo.id)}
                >
                    {todo.important ? "★ Important" : "☆ Important"}
                </button>

                <button
                    onClick={() => onEdit(todo)}
                >
                    Edit
                </button>

                <button
                    className="delete-button"
                    onClick={() => deleteTodo(todo.id)}
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default TodoItem;