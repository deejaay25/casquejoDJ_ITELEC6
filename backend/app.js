const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");

        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
        next();
})
app.use("/api/posts", (req, res, next) => {
    const posts = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully',
        post
    });
        [
            {
                id: "daniiigurl",
                title: "First title from server side",
                content: "First content from server side"
            },
            {
                id: "daniyuuuh",
                title: "Second title from server side",
                content: "Second content from server side"
            }
        ];
    res.status(200).json({
        message:'Posts successfully fetch',
        posts: posts
    });
});

module.exports = app;