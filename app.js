const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const session = require('express-session');
const bcrypt = require('bcrypt');
const _ = require('lodash');

// Constants for existing content
const homeStartingContent = "Bring Your Ideas to Life: Design a stunning blog that showcases your thoughts, passions, and expertise.";
const aboutContent = "Welcome to the LEKHAN! This site is a platform where users can create, view, and manage blog posts with ease.";

const app = express();

app.use(express.static('public'));

// Set up session middleware
app.use(session({
    secret: 'secret', // Change this to a more secure secret in production
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blogDB", { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);

// Existing routes
app.get("/", async function(req, res) {
    const posts = await Post.find({});
    res.render("home", {
        startingContent: homeStartingContent,
        posts: posts,
        user: req.session.user
    });
});

app.get("/about", function(req, res) {
    res.render("about", { aboutContent: aboutContent, user: req.session.user });
});

app.get("/compose", function(req, res) {
    if (req.session.user) {
        res.render("compose", { user: req.session.user });
    } else {
        res.redirect("/login");
    }
});

app.post("/compose", async function(req, res) {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });
    await post.save();
    res.redirect("/posts");
});

app.get("/posts", async function(req, res) {
    const posts = await Post.find({});
    res.render("posts", {
        posts: posts,
        user: req.session.user
    });
});

app.get("/posts/:postId", async function(req, res) {
    const requestedPostId = req.params.postId;
    const post = await Post.findById(requestedPostId);

    if (post) {
        res.render("post", {
            title: post.title,
            content: post.content,
            user: req.session.user
        });
    } else {
        res.redirect("/posts");
    }
});

// Authentication routes
app.get("/login", function(req, res) {
    res.render("login", { error: false, user: req.session.user });
});

app.post("/login", async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });

    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.redirect("/");
    } else {
        res.render("login", { error: true });
    }
});

app.get("/signup", function(req, res) {
    res.render("signup", { error: false, user: req.session.user });
});

app.post("/signup", async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Check if username already exists
    if (await User.findOne({ username: username })) {
        res.render("signup", { error: true });
    } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username: username, password: hashedPassword });
        await newUser.save();
        req.session.user = newUser;
        res.redirect("/");
    }
});

// Logout route
app.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/");
});

// Start server
app.listen(3000, function() {
    console.log("Brain the size of earth, ShutUp aditya!! starting your server on port 3000.");
});
