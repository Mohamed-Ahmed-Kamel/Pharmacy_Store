require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require('mongoose');
const session = require('express-session');
const mongogStore = require('connect-mongo');
const passport = require('passport');

// Database connection
require('./config/mongoDBconnect');

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongogStore.create({
        mongoUrl: process.env.MONGO_CONNECT,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24h
}))
// Configure Passport
require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

// Assets
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    // console.log(req.user.role)
    next()
})

// Set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/views"));
app.set('view engine', 'ejs');

// Routes
const homeRoute = require('./routes/homeRoute');
const authRoute = require('./routes/auth');
const cartRoute = require('./routes/cartRoute');
const adminRoute = require('./routes/adminRoute');

// Path
app.use('/', homeRoute)
app.use('/user', authRoute)
app.use('/cart', cartRoute)
app.use('/admin', adminRoute)


app.listen(port, console.log(`Server start on port: ${port}`))