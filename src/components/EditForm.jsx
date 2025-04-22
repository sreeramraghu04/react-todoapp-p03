import React from "react";
import { useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const EditForm = ({ todo, updateTask }) => {
  const [value, setValue] = useState(todo.title);
  const handlesubmit = (e) => {
    e.preventDefault();
    updateTask(value, todo.id);
    setValue("");
  };
  return (
    <div className="text-black">
      <form onSubmit={handlesubmit} action="">
        <div
          className={`${
            todo.done ? " bg-green-600 " : "bg-gray-400"
          } max-w-xs w-80 h-50  rounded-md border border-double border-slate-900 shadow-md  dark:text-gray-800 `}
        >
          <div className="flex flex-col justify-between items-center p-6 space-y-8 h-full">
            <div className="flex items-center w-full justify-between space-y-2 ">
              <h2 className="text-2xl font-semibold tracking-wide bg-black text-white rounded-md px-2 mt-2">
                {todo.id}
              </h2>
              <div className="flex justify-center w-full">
                <input
                  className="text-xl mr-2 border bg-gray-300"
                  type="text"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-2 items-center h-full">
              <button
                type="submit"
                className="flex items-center justify-center w-24 p-3 font-semibold tracking-wide rounded-md text-green-600 bg-black"
              >
                <TaskAltIcon />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
