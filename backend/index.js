import express from "express";
import dotenv from "dotenv"
import { body, validationResult } from 'express-validator';
import message from "./Models/MessageModel.js";
import connectToDB from "./db.js";
import cors from "cors"

dotenv.config()
connectToDB();
const app = express();

const port = process.env.PORT || 5000

app.use(cors())

app.use(express.json())


app.post("/message", [
    body("username").notEmpty(),
    body("message").notEmpty(),
], async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
       return res.status(400).json({message: "Username or Message is Empty"});
    }
    const newMessage = await message.create({
        username: req.body.username,
        message: req.body.message
    });
    
    res.status(200).json({message: newMessage});
});
app.get("/message", async (req, res) => {

    const fetchMessages = await message.find()
    
    res.status(200).json({message: fetchMessages});;
});

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`)
})