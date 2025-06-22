import { useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const EditForm = ({ item, updateTask }) => {
  const [value, setValue] = useState(item.title);
  const handlesubmit = (e) => {
    e.preventDefault();
    updateTask(value, item.id);
    setValue("");
  };
  //! Defines a function named handleSubmit that takes an event (e) as an argument.
  //* This function is typically triggered when a user submits a form.
  //! Prevents the default form submission behavior.
  //* Without this, the form would refresh the page, which is unnecessary in a React app.
  //! Calls the updateTask function to update the task's title.
  //* value: The new task title entered by the user.
  // todo.id: The ID of the task being updated.
  // This ensures that the correct task is modified in the state.
  //! Clears the input field after submission.
  //* This improves user experience by resetting the input box for new entries.
  return (
    <div className="text-black">
      <form onSubmit={handlesubmit} action="">
        {/* //! Defines a form that triggers handleSubmit when submitted.
        TheonSubmit={handlesubmit} ensures React handles the submission instead
        of default browser behavior. */}
        <div
          className={`${
            item.completed ? " bg-green-600 " : "bg-gray-400"
          } max-w-xs w-80 h-50  rounded-md border border-double border-slate-900 shadow-md  dark:text-gray-800 `}
        >
          {/* //! Dynamic Background Color //* Uses template literals ({} inside
          className) to change styles dynamically.todo.done checks whether the
          task is completed: // If true, background is green (bg-green-600). //
          If false, background is gray (bg-gray-400). */}
          <div className="flex flex-col justify-between items-center p-6 space-y-8 h-full">
            <div className="flex items-center w-full justify-between space-y-2 ">
              <h2 className="text-2xl font-semibold tracking-wide bg-black text-white rounded-md px-2 mt-2">
                {item.id}
              </h2>
              <div className="flex justify-center w-full">
                <input
                  className="text-xl mr-2 border bg-gray-300"
                  type="text"
                  value={value}
                  //! Sets the input field's value dynamically using the value state.
                  //* Whatever the user types will be stored in the value variable.
                  onChange={(e) => {
                    setValue(e.target.value);
                    //! Captures the user's input in real time.
                    //* e.target.value retrieves the typed text.
                    // setValue(...) updates the state, ensuring React re-renders the component with the new task.
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
