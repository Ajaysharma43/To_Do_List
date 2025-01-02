import { useDebugValue, useEffect } from "react"
import { useParams } from "react-router-dom"

const UpdateToDo = () => {
    const {_id}  = useParams()

    useEffect(()=>{
        console.log(_id);
    },[])
    return(
        <>
        </>
    )
}

export default UpdateToDo;