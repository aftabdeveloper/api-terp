require("dotenv").config()
require("./module/db.module")
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const commonRouter = require("./routes/common.routes");
const ValidClient = require("./middleware/valid-client.middleware")
const Error = require("./middleware/error.middleware")

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(ValidClient)
app.use('/', indexRouter);
app.use("/common",commonRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(Error)

module.exports = app;
