import { useContext } from "react";
import { Link } from "react-router-dom";
import { TodoContext } from "../context/TodoContext";

function Home() {

    const { todos } = useContext(TodoContext);

    const completed = todos.filter(
        (todo) => todo.completed
    ).length;

    const pending = todos.filter(
        (todo) => !todo.completed
    ).length;

    return (
        <div className="page">

            <div className="hero">

                <h1>
                    Welcome to My Todo App
                </h1>

                <p>
                    Organize your daily tasks, weekly plans
                    and important days in one place.
                </p>

                <Link
                    to="/dashboard"
                    className="main-button"
                >
                    Go to Dashboard
                </Link>

            </div>

            <div className="home-cards">

                <div className="summary-card">
                    <h2>{todos.length}</h2>
                    <p>Total Tasks</p>
                </div>

                <div className="summary-card">
                    <h2>{completed}</h2>
                    <p>Completed</p>
                </div>

                <div className="summary-card">
                    <h2>{pending}</h2>
                    <p>Pending</p>
                </div>

            </div>

        </div>
    );
}

export default Home;