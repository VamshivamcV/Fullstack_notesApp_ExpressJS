// const mongoose = require("mongoose");
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

export default mongoose.model('Note', noteSchema);