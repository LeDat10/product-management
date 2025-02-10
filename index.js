const express = require('express');
require("dotenv").config();
const methodOverride = require('method-override');
const database = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require('express-flash');
const systemConfig = require("./config/system");

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

// Flash
app.use(cookieParser('abcdef'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

app.use(express.static(`${__dirname}/public`)); // nhúng file tĩnh

// console.log(__dirname);


// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});