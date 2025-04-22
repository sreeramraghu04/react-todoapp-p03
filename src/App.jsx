import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import EditForm from "./components/EditForm";

const localData = () => {
  let list = localStorage.getItem("data");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [todo, setTodos] = useState(localData());
  const [newTask, setNewTask] = useState("");

  //! add task
  const addTask = (e) => {
    if (!newTask) {
      alert("Please enter a task");
    } else {
      let newId = todo.length + 1;
      /* let newId = todo.length === 0 ? 1 : todo[todo.length - 1]; */

      let newEntry = { id: newId, title: newTask, completed: false };
      setTodos([...todo, newEntry]);
      setNewTask("");
    }
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todo));
  }, [todo]);

  //! delete task
  const deleteTask = (id) => {
    setTodos(
      todo.filter((item) => {
        return item.id !== id;
      })
    );
  };

  //! task done
  const taskDone = (id) => {
    setTodos(
      todo.map((item) => {
        return item.id === id ? { ...item, completed: true } : item;
      })
    );
  };

  //! edit task
  const editTask = (id) => {
    setTodos(
      todo.map((item) => {
        return item.id === id ? { ...item, editable: !item.editable } : item;
      })
    );
  };

  //! update task
  const updateTask = (editedTask, id) => {
    setTodos(
      todo.map((item) => {
        return item.id === id
          ? { ...item, title: editedTask, editable: !item.editable }
          : item;
      })
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-300 text-white w-full min-h-screen rounded-2xl shadow-md p-10">
      <form>
        <div className="flex justify-center text-gray-700 bg-white w-80 h-10">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter the task here ->"
            className="text-xl font-serif w-64 ml-4 outline-none bg-transparent"
          />
          <button
            type="submit"
            className="pl-4 font-bold mr-4 hover:cursor-pointer"
            onClick={addTask}
          >
            Add
          </button>
        </div>
      </form>
      <div className="flex flex-wrap px-24 justify-center gap-4 mt-6 w-4/6">
        {todo.map((todo, index) => {
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
