var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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


class VehicleSettings {
  constructor(trim, paint, wheels, interior, msrp, session_id) {
      this.trim = trim;
      this.paint = paint;
      this.wheels = wheels;
      this.interior = interior;
      this.msrp = msrp;
      this.session_id = session_id;
  }
}

class SessionId {
  constructor(session_id) {
      this.session_id = session_id;
  }
}

function start() {
  console.log(process.env.INVOKE_URL);
  tryGet(1);
}

async function tryGet(session_id) {
  const url = `${process.env.INVOKE_URL}/get-vehicle-settings`;

  const body = JSON.stringify(new SessionId(session_id));

  console.log("Get: " + body);

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.API_KEY
          },
          body: body
      });

      if (!response.ok) {
          throw new Error(`Failed to retrieve data: ${response.statusText}`);
      }

      console.log(`Completed: ${response.status}`);
      const data = await response.json();
      const settings = data.Item;
      console.log(`Settings: ${settings.trim}`);
  } catch (error) {
      console.error(`Error: ${error.message}`);
  }
}

// Call start function when the script loads
start();