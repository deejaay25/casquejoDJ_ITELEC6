const express = require('express');

const app = express();

app.use("/api/posts", (req, res, next) => {
    const posts = 
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
