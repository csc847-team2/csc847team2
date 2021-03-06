var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const db = require("./db/database.js");
const config = require('./config.json');
const pubsub = require('@google-cloud/pubsub');
const storage = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');
const translate = require('@google-cloud/translate');
const textToSpeech = require('@google-cloud/text-to-speech');
const Buffer = require('safe-buffer').Buffer;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');
var translateRouter = require('./routes/translate');
var textToSpeechRouter = require('./routes/textToSpeech');
var playAudioRouter = require('./routes/mp3');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/translate', translateRouter);
app.use('/textToSpeech', textToSpeechRouter);
app.use('/mp3', playAudioRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
