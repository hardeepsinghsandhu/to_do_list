const express = require('express')
require("dotenv").config()
const app = express()
const cors = require('cors')
var pg = require('pg');
var pool = new pg.Client(process.env.LINK);  

//Middleware
pool.connect();
app.use(cors())
app.use(express.json()) // => Allows us to accress the req.body

//ROUTES

//Get all todos

app.get("/todos", async (req,res)=>{
    try{
        const allTodos = await pool.query("select * from todo")
        res.json(allTodos.rows)
    } catch(e){
        console.log(e.message)        
    }
})

//Create a todo

app.post('/todos', async(req,res)=>{
    try{
        const {description} = req.body
        await pool.query("insert into todo(description) values ($1)",[description])
    } catch(e){
        console.log(e.message)
    }
})

//Update a todo

app.put('/todos/:id', async(req,res)=>{
    try{
        const {description} = req.body
        const id = req.params.id
        await pool.query("update todo set description = $1 where tid = $2",[description,id])
    } catch(e){
        console.log(e.message)
    }
})

//Delete a todo

app.delete('/todos/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        await pool.query("delete from todo where tid = $1",[id])
    } catch(e){
        console.log(e.message)
    }
})

//Starting server
app.listen(process.env.PORT,()=>{
    console.log("Starting on port "+process.env.PORT)
})