import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoListForm = () => {
    const [listName, setListName] = useState("");
    const navigate = useNavigate();
  
    const ToDo = useRef();
    const Task = useRef();
  
    const SendData = async () => {
      const todo = ToDo.current.value;
      const task = Task.current.value;
      console.log(todo);
  
      if (todo !== "" && task !== "") {
        const response = await axios.post("http://localhost:3000/AddToDo", {
          todo,
          task,
        });
        const result = response.data;
        console.log(result);
        if (result === "success") {
          console.log("data saved");
          navigate("/TodoList");
        }
      } else {
        console.log("data is incomplete");
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Add a New To-Do List
          </h1>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="listName"
                className="block text-sm font-medium text-gray-700"
              >
                Task Name
              </label>
              <input
                type="text"
                id="listName"
                name="listName"
                ref={ToDo}
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter list name"
                required
              />
  
              <label
                htmlFor="listName"
                className="block text-sm font-medium text-gray-700"
              >
                Task
              </label>
  
              <textarea
                name=""
                id=""
                ref={Task}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => SendData()}
            >
              Add List
            </button>
          </form>
        </div>
      </div>
    );
  };

export default TodoListForm