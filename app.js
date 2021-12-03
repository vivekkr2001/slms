var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app_api/models/db');
var uglifyJs = require("uglify-js");
var fs = require('fs');
var passport = require('passport');

//var routes = require('./app_server/routes/index');
require('./app_api/config/passport');
var routesApi = require('./app_api/routes/index');
// var users = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');
var appClientFiles = [
    './app_client/app.js',
    './app_client/common/services/authentication.service.js',
    './app_client/auth/register/register.controller.js',
    './app_client/auth/login/login.controller.js',
    './app_client/common/directives/navigation.controller.js',
    './app_client/common/services/slmsData.service.js',
    './app_client/teacher/teacher.controller.js',
    './app_client/student/student.controller.js',
    './app_client/admin/admin.controller.js',
    './app_client/modal/course/courseModal.controller.js',
    './app_client/common/services/courseContent.service.js',
    './app_client/student/student.courseDetails.controller.js',
    './app_client/admin/admin.courseDetails.controller.js',
    './app_client/teacher/teacher.courseDetails.controller.js',
    './app_client/modal/content/contentModal.controller.js',
    './app_client/common/directives/footergeneric.directives.js',
    './app_client/common/directives/navigation.directive.js',
    './app_client/common/directives/pageHeader.directive.js'
].map(function (file) {
    return fs.readFileSync(file, 'utf8');
})


var uglified = uglifyJs.minify(appClientFiles, { compress : false });
fs.writeFile('public/angular/slms.min.js', uglified.code, function (err){
    if(err) {
        console.log(err);
    } else {
        console.log('Script generated and saved: slms.min.js');
    }
}); 


//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/app_client')));
app.use(passport.initialize());

//app.use('/', routes);
app.use('/api', routesApi);
// app.use('/users', users);
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, '/app_client', 'index.html'));
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
    }
    });


module.exports = app;
