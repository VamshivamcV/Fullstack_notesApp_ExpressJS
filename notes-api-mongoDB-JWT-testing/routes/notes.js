// const express = require("express");
// const Note = require("../models/note");
// const authenticateToken = require('../middleware/auth');
import express from 'express';
import Note from '../models/note.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

//Create a new note
router.post('/', authenticateToken, async (req, res)=> {
    const {title, content} = req.body;
    const note = await Note.create({
        // title:
         title,
        // content: 
        content,
        user: req.user.userId
    });
    res.status(201).json(note);
});

//Read all notes
router.get('/', authenticateToken, async (req,res)=>{
    const notes = await Note.find({user: req.user.userId});
    // if (!notes) return res.status(404).json({message:'no notes created'});
    res.json(notes);
});

//Read a single note
router.get('/:id', authenticateToken, async (req, res)=>{
    const { id } = req.params;
    try{
        const note = await Note.findOne({user: req.user.userId, _id: id});
        if (!note) return res.status(404).json({message:'no notes created'});
        res.json(note);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

//Update the note
router.put('/:id', authenticateToken, async (req,res)=>{
    const { id } = req.params;
    try{
        const note = await Note.findOneAndUpdate({_id: id, user: req.user.userId}, req.body, {new: true});
        if (!note) return res.status(404).json({message: 'Not Authorized'});
        res.json(note);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

//Delete the note
router.delete("/:id",authenticateToken, async (req,res)=> {
    const { id } = req.params;
    try{
        const note = await Note.findOneAndDelete({_id: id, user: req.user.userId});
        if (!note) return res.status(404).json({message: 'Not Authorized'});
        res.json({message: "Note Deleted"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

export default router;
