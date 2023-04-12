import React, {Fragment, useState, useEffect} from "react"
import "./DisplayTodo.css"
import EditTodo from "./EditTodo"

const DisplayTodo = () =>{

const [todos, setTodos] = useState([])

useEffect(()=>{getTodos()},[todos])

const getTodos= async ()=>{
    const res = await fetch("http://localhost:5000/todos")
    const todoArray = await res.json()
    setTodos(todoArray)
}

const deleteTodos = async(id)=>{
    try{
        const res = await fetch(`http://localhost:5000/todos/${id}`,{
            method: 'DELETE'
        })

    setTodos(todos.filter(x=>x.tid!==id))
    }catch(err){
        console.log("Something is wrong")
    }
}


const descriptionList= todos.map(x=>
<tr key={x.tid}>
    <td>{x.description}</td>
    <td><EditTodo editId={x.tid}/></td>
    <td><button onClick={()=>deleteTodos(x.tid)}>Delete</button></td>
</tr>
)


    return(
        <Fragment>
            <table>
                <thead>
                <tr>
                    <td>Description</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
                </thead>
                <tbody>
                        {descriptionList}
                </tbody>
            </table>
        </Fragment>   
    )
}

export default DisplayTodo