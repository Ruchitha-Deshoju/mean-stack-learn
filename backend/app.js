const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts")

//npm install --save express
//npm install --save-dev nodemon
//npm install --save body-parser
//npm install --save mongoose

const app = express();

mongoose.connect("mongodb+srv://ruchi:OSEFP0SQSHdJrvVn@cluster0.afdij.mongodb.net/node-angular?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to database')
})
.catch(() => {
    console.log("connection failed")
})
// OSEFP0SQSHdJrvVn

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT')
    next();
})

app.use("/api/posts", postsRoutes)


module.exports = app;