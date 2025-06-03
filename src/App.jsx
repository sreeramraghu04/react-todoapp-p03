import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import EditForm from "./components/EditForm";

/* const localData = () => {
  let list = localStorage.getItem("data");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}; */

const localData = () => {
  //! This defines a function named localData using arrow function syntax.
  //* It doesn’t take any parameters.
  // It's typically used to retrieve and return saved data from the browser's localStorage.
  let list = localStorage.getItem("data");
  //* This line tries to get a value stored in the browser’s localStorage under the key "data".
  //?  string if the key "data" exists.
  //* null if the key doesn’t exist.
  return list ? JSON.parse(list) : [];
  //! This is a ternary operator (short form of if...else).
  //* It checks:
  // If list is truthy (i.e., not null or undefined):
  // Use JSON.parse(list) to convert the string from localStorage into a JavaScript object (typically an array or object).
  // If list is falsy (i.e., null or empty):
  // Return an empty array [].
};

function App() {
  const [todo, setTodos] = useState(localData());
  const [newTask, setNewTask] = useState("");

  //! add task
  const addTask = (e) => {
    //* Defines addTask function which will be executed to add a task.
    // `e` Parameter is included, it's not explicitly (not) used in the function. 
// If this function is triggered by an event (like a button click), it can be used for preventing default behavior (not done here).
    if (!newTask) {
      //* Checks if newTask is empty.
      // newTask represents the input that user types in the task name.
      alert("Please enter a task");
      //* Shows an alert message to the user if they tried to add a task without typing anything.
// Prevents empty tasks from being added.
    } else {
      //* If newTask is not empty, the function proceeds to create a new task object.
      let newId = todo.length + 1;
      //* Generates a unique ID for the new task.{todo.length + 1} ensures each new task gets a number higher than existing ones.
      let newEntry = { id: newId, title: newTask, completed: false };
      //* Creates a new task object:- 
// {id:} The generated ID.
// {title:} Stores the text input from newTask.
// {completed: false} Marks the task as incomplete initially.
      setTodos([...todo, newEntry]);
      //* Updates the state (todo) by adding the new task.
// {...todo} spreads the existing tasks.newEntry is appended to the list.
      setNewTask("");
      //* Resets the input field to empty after adding the task, so users can type a new one.
    }
  };

  //! delete task
  const deleteTask = (id) => {
    //* Defines a function called deleteTask that takes an id as an argument.
// This id represents the specific task that should be removed.
    setTodos(
      todo.filter((item) => {
        return item.id !== id;
        //* Filters out the task whose id matches the given id.
// {todo.filter} Loops through the list of tasks (todo).
// Keeps only the tasks whose id does NOT match the provided id.
// {setTodos(...)} Updates the state (todo) with the filtered list (excluding the deleted task).
// React automatically re-renders the UI to reflect the change.
      })
    );
  };

  useEffect(() => {
    //! This starts a React useEffect hook.
    //* useEffect lets you perform side effects in a React component — like saving to localStorage, fetching data, etc.
    // The function inside useEffect runs:
    // After the component renders.
    // Again only when the values in the dependency array change.
    localStorage.setItem("data", JSON.stringify(todo));
    //! This line saves the todo data into the browser's localStorage.
    //* Let's break it down further:
    // localStorage.setItem(key, value)
    // key: "data" — the name under which we store the data.
    // value: JSON.stringify(todo)
    // This converts the todo array/object into a string, because localStorage can only store strings.
  }, [todo]);
  //! This is the dependency array.
  //* It tells React to only run the effect when todo changes.
  //? Example:
  // If todo was [“Buy milk”] and you add “Walk dog”, the new todo becomes [“Buy milk”, “Walk dog”].
  // Since todo changed, useEffect runs again and updates localStorage.

  //! task done
  const taskDone = (id) => {
    setTodos(
      todo.map((item) => {
        //* map() method loops through the existing task list (todo)
        // It creates a new array with modified values while keeping original tasks unchanged.
        return item.id === id ? { ...item, completed: true } : item;
        //* (Checking the Task ID)Compares each task's id to the provided id.
        // If a match is found, the task needs to be updated.
        // (Updating the Task Object){ ...item } spreads the existing task object so that it keeps all original properties.
        // completed: true updates only the completed status while keeping everything else intact.
        // Replaces the old list (todo) with the new one (where only the matched task is updated).
        // React automatically re-renders the UI to reflect the change.
      })
    );
  };

  //! edit task
  const editTask = (id) => {
    setTodos(
      todo.map((item) => {
        //* Loops through each item in the todo array to create a modified list.
        // map() ensures React updates only the necessary elements efficiently.
        return item.id === id ? { ...item, editable: !item.editable } : item;
        //* Compares each task’s id to the provided id.
        // If a match is found, it needs to be updated.
        //* { ...item } spreads all the existing properties of the task.
        //editable: !item.editable flips the current editable status:
        // If editable was true, it becomes false.
        // If editable was false, it becomes true.
      })
    );
  };

  //! update task
  const updateTask = (editedTask, id) => {
    setTodos(
      todo.map((item) => {
        //* Loops through each task (item) in the todo array.
        // map() ensures that a new updated array is created without modifying the original one.
        return item.id === id
          ? { ...item, title: editedTask, editable: !item.editable }
          : item;
        //* Compares each task's id to the provided id.
        // If the IDs match, this task is the one that needs to be updated.
        //* { ...item } spreads the existing task object, keeping all its current properties.
        // title: editedTask replaces the old title with the newly provided one (editedTask).
        //* editable is flipped:
        // If it was true, it becomes false (user finishes editing).
        // If it was false, it becomes true (user enters edit mode).
        //* This allows dynamic switching between text display and input field.
      })
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-900 text-white w-full min-h-screen shadow-md p-10">
      <h1 className="font-mono font-semibold mt-15 mb-5 w-[250px] text-center">
        "Turn plans into progress, one task at time."
      </h1>
      <form>
        <div className="flex justify-center text-gray-700 bg-white w-80 h-15 rounded-md">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            //! value={newTask} → This binds the input to a React state variable newTask.
            //* onChange={(e) => setNewTask(e.target.value)} → Updates newTask whenever the user types:
            // e.target.value retrieves the text input.
            // setNewTask(...) updates the state, re-rendering the component dynamically.
            placeholder="Enter the task here."
            className="text-xl font-serif w-64 ml-4 outline-none bg-transparent"
          />
          <button
            type="submit"
            className="pl-6 font-bold mr-4 hover:cursor-pointer"
            onClick={addTask}
          >
            {" "}
            Add Task
          </button>
          {/* //! Calls the addTask function when the button is clicked This
          //! function validates user input, creates a new task, and updates the
          state. */}
        </div>
      </form>
      <div className="flex flex-wrap px-24 justify-center gap-4 mt-6 w-4/6">
        {todo.map((todo, index) => {
          //! Loops through the todo array, rendering each task dynamically.
          //* index helps track the position of each task.
          return todo.editable ? (
            <EditForm todo={todo} updateTask={updateTask} />
          ) : (
            <div key={todo.id}>
              <TodoList
                key={todo.id}
                todo={todo}
                deleteTask={deleteTask}
                taskDone={taskDone}
                done={todo.completed}
                index={index}
                editTask={editTask}
              />
              //! If todo.editable is true → Show Edit Form //* Displays{" "}
              <EditForm />
              {/* //* allowing users to edit the task. //? Passes todo and
              updateTask as props. //* If todo.editable is false → Show Task
              List. //? Displays <TodoList />, rendering the task normally.
              //*Passes multiple props: // todo → Task data. //* deleteTask
              →Function to remove the task. //? taskDone → Function to mark task
              as completed. //* done={todo.completed} → Tracks completion
              status. //? index → Task position //* editTask → Function to
              toggle edit mode. */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
