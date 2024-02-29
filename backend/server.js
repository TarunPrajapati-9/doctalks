import express from 'express';
import connectDB from './Config/dbConnection.js';
import cors from 'cors';
import dotenv from 'dotenv';
import userrouter from "./Routes/userRoutes.js"

const port = process.env.PORT || 3000;

connectDB();

const app = express()
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello From Backend Server!')

})

app.use("/user", userrouter);

app.listen(port, () => { console.log("server start at http://localhost:3000");});