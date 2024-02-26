require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const userdes = require('./routes/userDes');

app.use('/',userdes);

app.listen(5000,()=>{
    console.log("Server is running on port : 5000");
})