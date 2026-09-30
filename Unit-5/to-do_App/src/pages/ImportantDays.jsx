import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function ImportantDays() {

    const { todos } = useContext(TodoContext);

    const [editData, setEditData] = useState(null);

    const importantTodos = todos.filter(
        (todo) => todo.important
    );

    return (
        <div className="page">

            <h1>Important Days</h1>

            <p>
                Your important tasks and events are shown here.
            </p>

            <TodoForm
                editData={editData}
                clearEdit={() => setEditData(null)}
            />

            <TodoList
                todos={importantTodos}
                onEdit={(todo) => setEditData(todo)}
            />

        </div>
    );
}

export default ImportantDays;