import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function Calendar() {

    const { todos } = useContext(TodoContext);

    const today = new Date();

    const [currentMonth, setCurrentMonth] =
        useState(today.getMonth());

    const [currentYear, setCurrentYear] =
        useState(today.getFullYear());

    const [selectedDate, setSelectedDate] =
        useState(
            today.toISOString().split("T")[0]
        );

    const [editData, setEditData] = useState(null);

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const firstDay = new Date(
        currentYear,
        currentMonth,
        1
    ).getDay();

    const daysInMonth = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();

    const previousMonth = () => {

        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }

    };

    const nextMonth = () => {

        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }

    };

    const createDate = (day) => {

        const month = String(
            currentMonth + 1
        ).padStart(2, "0");

        const date = String(day).padStart(2, "0");

        return `${currentYear}-${month}-${date}`;

    };

    const selectedTodos = todos.filter(
        (todo) => todo.date === selectedDate
    );

    return (
        <div className="page">

            <h1>Calendar</h1>

            <div className="calendar">

                <div className="calendar-header">

                    <button onClick={previousMonth}>
                        ◀
                    </button>

                    <h2>
                        {monthNames[currentMonth]}{" "}
                        {currentYear}
                    </h2>

                    <button onClick={nextMonth}>
                        ▶
                    </button>

                </div>

                <div className="week-days">

                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>

                </div>

                <div className="calendar-grid">

                    {Array.from(
                        { length: firstDay },
                        (_, index) => (
                            <div
                                key={`empty-${index}`}
                                className="empty-day"
                            ></div>
                        )
                    )}

                    {Array.from(
                        { length: daysInMonth },
                        (_, index) => {

                            const day = index + 1;

                            const dateValue =
                                createDate(day);

                            const hasTodo = todos.some(
                                (todo) =>
                                    todo.date === dateValue
                            );

                            return (
                                <button
                                    key={day}
                                    className={`calendar-day ${selectedDate === dateValue
                                            ? "selected-day"
                                            : ""
                                        }`}
                                    onClick={() =>
                                        setSelectedDate(dateValue)
                                    }
                                >

                                    <span>
                                        {day}
                                    </span>

                                    {hasTodo && (
                                        <small>• Task</small>
                                    )}

                                </button>
                            );

                        }
                    )}

                </div>

            </div>

            <div className="selected-date">

                <h2>
                    Tasks for {selectedDate}
                </h2>

                <TodoList
                    todos={selectedTodos}
                    onEdit={(todo) => setEditData(todo)}
                />

            </div>

            <TodoForm
                editData={editData}
                clearEdit={() => setEditData(null)}
            />

        </div>
    );
}

export default Calendar;