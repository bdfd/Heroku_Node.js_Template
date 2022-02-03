/*
 * @Author: BDFD
 * @Date: 2022-02-03 12:27:46
 * @LastEditTime: 2022-02-03 13:34:35
 * @LastEditors: BDFD
 * @Description:
 * @FilePath: \Heroku_Node.js_Template\app.js
 * @Reference: /bdfd/Fork-Repo-List/node-website
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var cors = require('cors');
var fs = require('fs');
var methodOverride = require('method-override');

var index = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// set path for static assets
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// routes
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// render the error page
	res.status(err.status || 500);
	res.render('error', { status: err.status, message: err.message });
});

module.exports = app;
