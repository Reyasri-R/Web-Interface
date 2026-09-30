import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function Weekly() {

    const { todos } = useContext(TodoContext);

    const [editData, setEditData] = useState(null);

    const today = new Date();

    const day = today.getDay();

    const startOfWeek = new Date(today);

    startOfWeek.setDate(
        today.getDate() - day
    );

    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);

    endOfWeek.setDate(
        startOfWeek.getDate() + 6
    );

    const weeklyTodos = todos.filter((todo) => {

        const todoDate = new Date(
            todo.date + "T00:00:00"
        );

        return (
            todoDate >= startOfWeek &&
            todoDate <= endOfWeek
        );

    });

    return (
        <div className="page">

            <h1>Weekly Tasks</h1>

            <p>
                Showing tasks from{" "}
                {startOfWeek.toLocaleDateString()}{" "}
                to{" "}
                {endOfWeek.toLocaleDateString()}
            </p>

            <TodoForm
                editData={editData}
                clearEdit={() => setEditData(null)}
            />

            <TodoList
                todos={weeklyTodos}
                onEdit={(todo) => setEditData(todo)}
            />

        </div>
    );
}

export default Weekly;