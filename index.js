const express = require('express');
const path = require("path");
require("dotenv").config();
const methodOverride = require('method-override');
const database = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require('express-flash');
const systemConfig = require("./config/system");
var moment = require('moment');

const route = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');
database.connect();

const app = express();
const port = process.env.PORT;
app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');



// socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
global._io = io;



// Flash
app.use(cookieParser('abcdef'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

app.use(express.static(`${__dirname}/public`)); // nhúng file tĩnh

// Tiny MCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;
// Routes
route(app);
routeAdmin(app);
app.get("*", (req, res) => {
    res.render("client/pages/errors/404", {
        titlePage: "404 Not Found"
    });
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});