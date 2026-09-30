import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function Dashboard() {

    const { todos } = useContext(TodoContext);

    const [editData, setEditData] = useState(null);

    const completedTodos = todos.filter(
        (todo) => todo.completed
    );

    const pendingTodos = todos.filter(
        (todo) => !todo.completed
    );

    const importantTodos = todos.filter(
        (todo) => todo.important
    );

    return (
        <div className="page">

            <h1>Dashboard</h1>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h2>{todos.length}</h2>
                    <p>Total Tasks</p>
                </div>

                <div className="dashboard-card">
                    <h2>{completedTodos.length}</h2>
                    <p>Completed</p>
                </div>

                <div className="dashboard-card">
                    <h2>{pendingTodos.length}</h2>
                    <p>Pending</p>
                </div>

                <div className="dashboard-card">
                    <h2>{importantTodos.length}</h2>
                    <p>Important</p>
                </div>

            </div>

            <TodoForm
                editData={editData}
                clearEdit={() => setEditData(null)}
            />

            <h2 className="section-title">
                All Tasks
            </h2>

            <TodoList
                todos={todos}
                onEdit={(todo) => setEditData(todo)}
            />

        </div>
    );
}

export default Dashboard;