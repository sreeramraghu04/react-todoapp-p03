import React from "react";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditDocumentIcon from "@mui/icons-material/EditDocument";

const TodoList = ({ todo, deleteTask, taskDone, done, index, editTask }) => {
  console.table(todo);
  return (
    <div key={todo.id}>
      <div
        className={`${
          done ? "font-bold bg-green-500" : "bg-gray-200"
        } flex gap-4 max-w-xs w-80 min-h-50 max-h-max rounded-md border border-double border-slate-800 shawdow-md dark:text-gray-800`}
      >
        <div className="flex flex-col justify-between items-center p-5">
          <div className="flex p-5">
            <div>
              <h1 className="text-2xl font-semibold tracking-wide bg-black text-white rounded-md px-2">
                {index + 1}.
              </h1>
            </div>
            <div>
              <h1 className="text-2xl flex-wrap w-[200px] font-semibold tracking-wide px-2">
                {todo.title}
              </h1>
            </div>
          </div>
          <div className="flex gap-3 mt-20 items-center h-full">
            {/* //! done task */}
            <button
              onClick={() => {
                taskDone(todo.id);
              }}
              className="flex items-center justify-center p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-200 hover:cursor-pointer"
            >
              <PublishedWithChangesIcon />
            </button>
            {/* //! edit task */}
            <button
              onClick={() => {
                editTask(todo.id);
              }}
              className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 hover:cursor-pointer"
            >
              <EditDocumentIcon />
            </button>
            {/* //! delete task */}
            <button
              onClick={() => {
                deleteTask(todo.id);
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
