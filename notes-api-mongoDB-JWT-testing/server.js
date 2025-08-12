// require('dotenv').config();
// const mongoose = require('mongoose');

// const authRouter = require("./routes/auth");
// const notesRouter = require("./routes/notes");

// const express = require('express');
// const cors = require('cors');
import dotenv from 'dotenv';
import mongoose from 'mongoose';;
import authRouter from './routes/auth.js';
import notesRouter from './routes/notes.js';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch((err) => console.error("DB error",err));


app.use(cors());

//middleware to parse JSON bodies
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);


const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
  

export {app , server};