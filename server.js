const express = require('express');
const app = express();
const logger = require('morgan');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
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