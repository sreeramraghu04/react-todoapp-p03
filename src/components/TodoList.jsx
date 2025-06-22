import React from "react";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditDocumentIcon from "@mui/icons-material/EditDocument";

const TodoList = ({
  id,
  title,
  deleteTask,
  completed,
  taskDone,
  index,
  editTask,
}) => {
  //! Defines a functional component named TodoList.
  //* It receives multiple props:
  // todo → The task list array.
  // deleteTask → Function to remove a task.
  //taskDone → Function to mark a task as completed.
  // done → Tracks completion status.
  // index → Identifies each task position in the list.
  // editTask → Function to enable task editing.
  //! Logs the todo array as a table in the console.
  //* Helps debug by displaying structured data.
  return (
    <div key={id}>
      {/* //! Uses React's key prop to ensure efficient rendering. //* todo.id
      guarantees each task has a unique identifier, preventing unnecessary
      re-renders. */}
      <div
        className={`${
          completed ? "font-bold bg-green-500" : "bg-gray-500"
        } flex gap-4 max-w-xs w-80 min-h-50 max-h-max rounded-md border border-double border-white shawdow-md dark:text-gray-900`}
      >
        {/* //! Dynamic Background Based on done Status //* Controls the appearance
        of the task block dynamically. //* If done is true → Task is completed →
        font-bold bg-green-500 (Bold + Green). //* If done is false → Task is
        incomplete → bg-gray-500 (Gray background). */}
        <div className="flex flex-col justify-between items-center p-5">
          <div className="flex p-5">
            <div>
              <h1 className="text-2xl font-semibold tracking-wide bg-black text-white rounded-md px-2">
                {index + 1}.
              </h1>
            </div>
            <div>
              <h1 className="text-2xl flex-wrap w-[200px] font-semibold tracking-wide px-2">
                {title}
                {/* //! displays the title from the todo list */}
              </h1>
            </div>
          </div>
          <div className="flex gap-3 mt-20 items-center h-full">
            {/* //! done task */}
            <button
              onClick={() => {
                //! onClick={() => taskDone(todo.id)} (Event Handler)
                // Triggers the taskDone function when the button is clicked.
                // todo.id ensures the correct task is marked as completed.
                taskDone(id);
              }}
              className="flex items-center justify-center p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-200 hover:cursor-pointer"
            >
              <PublishedWithChangesIcon />
            </button>
            {/* //! edit task */}
            <button
              onClick={() => {
                //! onClick={() => editTask(todo.id)} (Event Handler)
                // Triggers the taskDone function when the button is clicked.
                // todo.id ensures the correct task is edited.
                editTask((id));
              }}
              className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 hover:cursor-pointer"
            >
              <EditDocumentIcon />
            </button>
            {/* //! delete task */}
            <button
              onClick={() => {
                //! onClick={() => deleteTask(todo.id)} (Event Handler)
                // Triggers the taskDone function when the button is clicked.
                // todo.id ensures the correct task is deleted.
                deleteTask(id);
              }}
              className="flex items-center justify-center p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 hover:cursor-pointer"
            >
              <DeleteOutlineIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
