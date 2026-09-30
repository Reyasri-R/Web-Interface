import TodoItem from "./TodoItem";

function TodoList({ todos, onEdit }) {

    if (todos.length === 0) {
        return (
            <div className="no-todos">
                <h3>No tasks found</h3>
                <p>Add a new task to get started.</p>
            </div>
        );
    }

    return (
        <div className="todo-list">

            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onEdit={onEdit}
                />
            ))}

        </div>
    );
}

export default TodoList;