var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose= require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(function(req, res, next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
 });


 mongoose.connect('mongodb+srv://commiavikalp:7883@cluster0.a6jbwdw.mongodb.net/?retryWrites=true&w=majority').then((response) => {
    console.log('Connected to the database successfully.');
}).catch(error => {
    console.log('Unable to connect to the database.');
});

module.exports = app;
