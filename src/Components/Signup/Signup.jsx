import axios from "axios";
import React, { useState } from "react";

const TodoListForm = ({ closeDialog }) => {
  const [listName, setListName] = useState("");
  const [taskContent, setTaskContent] = useState("");

  const Getdata = async () => {
    try {
      const response = await axios.get("http://localhost:3000/GetToDO");
      sessionStorage.setItem("data", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const SendData = async (e) => {
    e.preventDefault();
    if (listName && taskContent) {
      try {
        const response = await axios.post("http://localhost:3000/AddToDo", {
          todo: listName,
          task: taskContent,
        });
        if (response.data === "success") {
          await Getdata();
          setListName("");
          setTaskContent("");
          closeDialog();
        }
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      console.log("Data is incomplete");
    }
  };

  return (
    <div className="relative w-full max-w-sm p-6 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-lg shadow-lg">
      <button
        onClick={closeDialog}
        className="absolute top-2 right-2 text-gray-500 hover:text-blue-600 transition"
        aria-label="Close"
      >
        ✕
      </button>
      <h1 className="text-2xl font-bold text-blue-800 text-center mb-4">
        Add To-Do
      </h1>
      <form className="space-y-4" onSubmit={SendData}>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-300">
          <label
            htmlFor="listName"
            className="block text-sm font-medium text-blue-700 mb-1"
          >
            Task Name
          </label>
          <input
            type="text"
            id="listName"
            name="listName"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400"
            placeholder="Enter task name"
            required
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-300">
          <label
            htmlFor="taskContent"
            className="block text-sm font-medium text-blue-700 mb-1"
          >
            Task Details
          </label>
          <textarea
            id="taskContent"
            name="taskContent"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            required
            className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400"
            placeholder="Describe the task"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TodoListForm;
