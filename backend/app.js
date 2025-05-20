const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postroutes = require("./routes/posts");
const path = require("path");  


const app = express();
const  userRoutes = require("./routes/user");  




mongoose
  .connect("mongodb+srv://johnreyapable:eJw1Yy6X9HD5TWM2@cluster0.wk9oq.mongodb.net/apable?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch(() => {
    console.log("Connection Failed");
  });




app.use(bodyParser.json());




app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));  
app.use((req,res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(  
    "Access-Control-Allow-Headers",  
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


app.use(cors());


app.use("/api/posts", postroutes);
app.use("/api/user", userRoutes);  


module.exports = app;



