const express = require('express');
const authRoutes = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const users = require('../users');

authRoutes.get("/login", (req, res) => {
    res.render("login");
});

authRoutes.get('/signup', (req, res) => {
    res.render('signup');
});

authRoutes.post("/signup", (req, res) => {
    let newUser = req.body;
    console.log("newUser: ", newUser);
    users.push(newUser);
    console.log("users: ", users);
    res.redirect("/login");
});

authRoutes.post("/login", (req, res) => {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;
    let foundUser = users.find(user => user.username === reqUsername);
    if (!foundUser) {
        return res.render("login", { errors: ["You aren't a user..."] });
    }
    if (foundUser.password === reqPassword) {
        delete foundUser.password;
        req.session.user = foundUser;
        res.redirect("/profile");
    } else {
        return res.render("login", { errors: ["That's not your password..."] });
    }
});

authRoutes.get("/profile", checkAuth, (req, res) => {
    res.render("profile", { user: req.session.user });
});

module.exports = authRoutes;