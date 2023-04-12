import { Fragment , useState} from "react";
import React from "react";

const EditTodo=(props)=>{
    const editTodoFunc=async(id)=>{
        let updatedDescripton = {description: prompt("Enter new To-do description")}
        try{
            const body = updatedDescripton
            await fetch(`http://localhost:5000/todos/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })
        }catch(err){
            console.log(err.message)
        }
    }

    return(
        <Fragment>
            <button onClick={()=>editTodoFunc(props.editId)}>Edit</button>
        </Fragment>
    )
}

export default EditTodo