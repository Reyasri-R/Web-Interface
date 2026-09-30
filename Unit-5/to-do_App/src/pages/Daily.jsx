import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function Daily() {

    const { todos } = useContext(TodoContext);

    const [selectedDate, setSelectedDate] =
        useState(
            new Date().toISOString().split("T")[0]
        );

    const [editData, setEditData] = useState(null);

    const dailyTodos = todos.filter(
        (todo) => todo.date === selectedDate
    );

    return (
        <div className="page">

            <h1>Daily Tasks</h1>

            <div className="date-selector">

                <label>
                    Select Date:
                </label>

                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) =>
                        setSelectedDate(e.target.value)
                    }
                />

            </div>

            <TodoForm
                editData={editData}
                clearEdit={() => setEditData(null)}
            />

            <h2>
                Tasks for {selectedDate}
            </h2>

            <TodoList
                todos={dailyTodos}
                onEdit={(todo) => setEditData(todo)}
            />

        </div>
    );
}

export default Daily;