import { useRoutes } from "react-router-dom"
import TodoListForm from "../Signup/Signup";
import ToDoList from "../ToDo/ToDo";
import UpdateToDo from "../UpdateTodo/UpdataTodo";

const Route = () => {
    const route = useRoutes([
        {element:<TodoListForm/>,path:"/TodoListForm"},
        {element:<ToDoList/>,path:"/TodoList"},
        {element:<UpdateToDo/>,path:"/updateToDo/:_id"}
    ])
    return route;
}

export default Route;