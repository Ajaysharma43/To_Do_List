import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoListForm = () => {
  const [listName, setListName] = useState(""); // For managing the ToDo input
  const [taskContent, setTaskContent] = useState(""); // For managing the Task input
  const navigate = useNavigate();

  const Getdata = async () => {
    try {
      const response = await axios.get("http://localhost:3000/GetToDO");
      console.log(response.data);
      sessionStorage.setItem("data", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const SendData = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (listName !== "" && taskContent !== "") {
      try {
        const response = await axios.post("http://localhost:3000/AddToDo", {
          todo: listName,
          task: taskContent,
        });
        const result = response.data;
        console.log(result);
        if (result === "success") {
          console.log("Data saved");
          await Getdata();
          setListName("");
          setTaskContent("");
          navigate('/TodoList')
        }
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      console.log("Data is incomplete");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add a New To-Do List
        </h1>
        <form className="space-y-4" onSubmit={SendData}>
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
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter list name"
              required
            />

            <label
              htmlFor="taskContent"
              className="block text-sm font-medium text-gray-700"
            >
              Task
            </label>
            <textarea
              id="taskContent"
              name="taskContent"
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add List
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoListForm;
