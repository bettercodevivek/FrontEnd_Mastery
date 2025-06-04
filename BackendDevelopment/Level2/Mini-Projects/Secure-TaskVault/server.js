require('dotenv').config();

const express = require('express');

const app = express();

const UserRouter = require('./Routes/UserRoutes');

const TaskRouter = require('./Routes/TaskRoutes');

const cookieParser = require('cookie-parser');

const ConnectDB = require('./Config/db')

const PORT = 8080;


ConnectDB();


app.use(express.json());

app.use(cookieParser());

app.get('/',(req,res)=>{
    res.status(200).send("Welcome to Secure Task Manager !")
})

app.use("/api/auth",UserRouter);

app.use("/api/tasks",TaskRouter);

app.listen(PORT,()=>{
    console.log('Server Started !')
})