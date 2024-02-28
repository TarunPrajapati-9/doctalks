const express = require('express')
const connectDB = require('./Config/dbConnection');
const cors = require('cors');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 3000;

connectDB();

const app = express()
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello From Backend Server!')
})

app.use("/user", require("./Routes/userRoutes"));

app.listen(port);