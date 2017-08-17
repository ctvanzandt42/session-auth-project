const express = require('express');
const app = express();
const logger = require('morgan');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./users');
const checkAuth = require('./middlewares/checkAuth');
const sessionConfig = require('./sessionConfig');
const port = process.env.PORT || 3000;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.listen(port, () => {
    console.log(`You've reached port ${port}!`);
});

app.use(express.static(path.join(__dirname, "./public")));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

app.get("/", (req, res) => {
    console.log(req.session);
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post("/signup", (req, res) => {
    let newUser = req.body;
    console.log("newUser: ", newUser);
    users.push(newUser);
    console.log("users: ", users);
    res.redirect("/login");
});

app.post("/login", (req, res) => {
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

app.get("/profile", checkAuth, (req, res) => {
    res.render("profile", { user: req.session.user });
});