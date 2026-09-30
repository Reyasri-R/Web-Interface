import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";

function TodoForm({ editData, clearEdit }) {

    const { addTodo, editTodo } = useContext(TodoContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [important, setImportant] = useState(false);

    useEffect(() => {

        if (editData) {
            setTitle(editData.title);
            setDescription(editData.description);
            setDate(editData.date);
            setPriority(editData.priority);
            setImportant(editData.important);
        }

    }, [editData]);

    const handleSubmit = (e) => {

        e.preventDefault();

        if (title.trim() === "") {
            alert("Please enter a task title");
            return;
        }

        if (date === "") {
            alert("Please select a date");
            return;
        }

        const todo = {
            title,
            description,
            date,
            priority,
            important
        };

        if (editData) {
            editTodo(editData.id, todo);
            clearEdit();
        } else {
            addTodo(todo);
        }

        setTitle("");
        setDescription("");
        setDate("");
        setPriority("Medium");
        setImportant(false);
    };

    return (
        <div className="form-container">

            <h2>
                {editData ? "Edit Todo" : "Add New Todo"}
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>
                    Select Date
                </label>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <label>
                    Priority
                </label>

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <label className="checkbox-label">

                    <input
                        type="checkbox"
                        checked={important}
                        onChange={(e) => setImportant(e.target.checked)}
                    />

                    Important Task

                </label>

                <button type="submit">
                    {editData ? "Update Todo" : "Add Todo"}
                </button>

                {editData && (
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={clearEdit}
                    >
                        Cancel
                    </button>
                )}

            </form>

        </div>
    );
}

export default TodoForm;