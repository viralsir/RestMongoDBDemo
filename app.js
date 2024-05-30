var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var courseRouter =require('./routes/course');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
let corsOptions = {
    origin : ['http://localhost:4200'],
}

app.use(cors(corsOptions))


app.options('*',cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/course', courseRouter);

module.exports = app;
