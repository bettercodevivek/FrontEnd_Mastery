require('dotenv').config();

const express = require('express');

const app = express();

const ConnectDB = require('./Config/db');

const cookieparser = require('cookie-parser');

const authRoutes = require('./Routes/AuthRoutes');

const noteRoutes = require('./Routes/NotesRoutes');

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(cookieparser());

ConnectDB();

app.use('/api/auth',authRoutes);

app.use('/api/notes',noteRoutes);

app.listen(PORT,()=>{
    console.log('Server Started Successfully !')
})