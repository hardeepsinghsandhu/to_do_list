import React, {useState , Fragment} from "react";

const InputTodo=()=>{
    const [description, setDescription] = useState("")

    const onSubmitForm = async(e)=>{
        e.preventDefault()
        try{
            const body = {description}
            await fetch('http://localhost:5000/todos',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })
        }catch(err){

        }
    }

    return(
        <Fragment>
            <h1>Input To-do</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" placeholder="add Todo" value={description} onChange={x=> setDescription(x.target.value)} />
                <button>Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo