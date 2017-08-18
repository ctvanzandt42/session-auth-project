const express = require('express');
const app = express();
const logger = require('morgan');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./users');
const checkAuth = require('./middlewares/checkAuth');
const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
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

app.use(indexRoutes);
app.use(authRoutes);