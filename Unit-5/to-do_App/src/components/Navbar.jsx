import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="logo">
                My Todo App
            </div>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/daily">
                    Daily
                </Link>

                <Link to="/weekly">
                    Weekly
                </Link>

                <Link to="/important">
                    Important
                </Link>

                <Link to="/calendar">
                    Calendar
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;