import { Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TodoListForm from "../Signup/Signup";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToDoList = () => {
  const [ToDo, SetToDo] = useState([]);
  const [DilogTodo, setDilogTodo] = useState({});
  const [dilogstate, setdilogstate] = useState(false);
  const [createdilog, setdilog] = useState(false);
  const [UpdateDilog, setUpdateDilog] = useState(false);
  const [TaskName, SetTaskname] = useState("");
  const [Task, SetTask] = useState("");
  const [Taskid , setTaskid] = useState("");

  const navigate = useNavigate();

  const UpdatedTaskName = useRef();
  const UpdatedTask = useRef();

  useEffect(() => {
    const getdata = async () => {
      const response = await axios.get("http://localhost:3000/GetToDO");
      console.log(response.data);
      SetToDo(response.data);
    };
    getdata();
  }, []);

  useEffect(() => {
    if (!createdilog) {
      const getdata = async () => {
        const Data = sessionStorage.getItem("data");
        if (Data) {
          const parsed = JSON.parse(Data);
          SetToDo(parsed);
        }
      };
      getdata();
    }
  }, [createdilog]);

  const SetTodo = (id) => {
    const FindToDo = ToDo.find((ToDo) => ToDo._id === id);
    console.log(FindToDo);
    setDilogTodo(FindToDo); // Set DilogTodo state to the task to edit
    SetTask(FindToDo.Task); // Directly set Task state
    SetTaskname(FindToDo.TaskName); // Directly set TaskName state
    setdilogstate(true);
  };

  const UpdateToDo = (id) => {
    const FindToDo = ToDo.find((ToDo) => ToDo._id === id);
    console.log(FindToDo);
    setDilogTodo(FindToDo);
    SetTask(FindToDo.Task); // Set Task state when updating
    SetTaskname(FindToDo.TaskName); // Set TaskName state when updating
    setTaskid(FindToDo._id)
    setUpdateDilog(true);
  };

  const DeleteTask = async (id) => {
    const response = await axios.post("http://localhost:3000/DeleteToDo", {
      id,
    });
    if (response.data === "success") {
      setdilogstate(false);
      const updated = ToDo.filter((task) => task._id !== id);
      SetToDo(updated);
      toast.success('Task deleted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const UpdateTask = async (id) => {
    const UpdateTask = UpdatedTask.current.value;
    const UpdateTaskname = UpdatedTaskName.current.value;
    const response = await axios.post("http://localhost:3000/UpdateToDo", {
      UpdateTask,
      UpdateTaskname,
      id: DilogTodo._id, // Pass the correct ID
    });

    if (response.data === "updated") {
      setUpdateDilog(false); // Close the dialog
      const FindToDo = ToDo.find((ToDo) => ToDo._id == Taskid);
      console.log(FindToDo);
      FindToDo.TaskName = TaskName;
      FindToDo.Task = Task;

      toast.success('Task updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
    else{
      toast.error('Some issue occurred', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const CreateToDo = () => {
    if (!createdilog) {
      setdilog(true);
    } else {
      setdilog(true);
    }
  };

  return (
    <>
      {/* Update Dialog */}
      <Dialog open={UpdateDilog} onClose={() => setUpdateDilog(false)}>
        <DialogContent
          sx={{
            width: "auto",
            maxWidth: "500px",
            padding: "20px",
            height: "auto",
            backgroundColor: '#e0f7fa',
          }}
        >
          <form>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
              Update Task
            </h2>

            {/* Task Name Input */}
            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-sm font-medium text-blue-700"
              >
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                name="taskName"
                ref={UpdatedTaskName}
                className="w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={TaskName} // Directly bind TaskName state here
                onChange={(e) => SetTaskname(e.target.value)} // Ensure TaskName updates on change
                required
              />
            </div>

            {/* Task Description */}
            <div className="mb-4">
              <label
                htmlFor="taskDescription"
                className="block text-sm font-medium text-blue-700"
              >
                Task Description
              </label>
              <textarea
                id="taskDescription"
                name="taskDescription"
                ref={UpdatedTask}
                className="w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={Task} // Directly bind Task state here
                onChange={(e) => SetTask(e.target.value)} // Ensure Task updates on change
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 focus:outline-none"
                onClick={() => {
                  setUpdateDilog(false); // Close the dialog without making changes
                  setDilogTodo({}); // Clear the state when canceled
                  SetTask(""); // Clear Task state
                  SetTaskname(""); // Clear TaskName state
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none"
                onClick={UpdateTask} // Trigger update on click
              >
                Update Task
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Other dialogs */}
      <Dialog open={createdilog} onClose={() => setdilog(false)}>
        <DialogContent
          sx={{
            width: "auto",
            maxWidth: "500px",
            padding: "20px",
            height: "auto",
            backgroundColor: '#e0f7fa',
          }}
        >
          <TodoListForm closeDialog={() => setdilog(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={dilogstate} onClose={() => setdilogstate(false)}>
        <DialogContent>
          <div className="p-6 bg-blue-50 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-blue-700 mb-4">
              Are you sure you want to delete{" "}
              <span className="font-bold text-red-600">
                {DilogTodo?.TaskName}
              </span>
              ?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => DeleteTask(DilogTodo._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
              >
                Yes
              </button>
              <button
                onClick={() => setdilogstate(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              >
                No
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main ToDo list */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-4">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-blue-700">To-Do List</h1>
            <button
              onClick={() => CreateToDo()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
            >
              Add New Task
            </button>
          </div>
          <table className="table-auto w-full border-collapse border border-blue-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Task Title</th>
                <th className="px-4 py-2 text-left">Task</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ToDo.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-blue-50" : "bg-white"
                  } hover:bg-blue-100`}
                >
                  <td className="border px-4 py-2 text-blue-700">
                    {item.TaskName}
                  </td>
                  <td className="border px-4 py-2 text-blue-700">
                    {item.Task}
                  </td>
                  <td className="border px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => UpdateToDo(item._id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => SetTodo(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </div>
    </>
  );
};

export default ToDoList;
