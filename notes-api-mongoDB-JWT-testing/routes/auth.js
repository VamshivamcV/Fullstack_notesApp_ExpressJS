// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

const router = express.Router();

router.post('/register', async (req, res)=> {
    const {username, password} = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try{
        const user = await User.create({username, password: hashed });
        res.status(201).json({message: 'User created'});
    } catch (err) {
        res.status(400).json({ error: 'Username already exists'});
    }
});

router.post('/login', async (req, res)=> {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({ error: 'Invalid Credentials'});
    }
    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});
    res.json({token});
});

export default router;

