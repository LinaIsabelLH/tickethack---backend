require('./models/connection');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var tripsRouter = require('./routes/trips');
var basketsRouter = require('./routes/baskets');
var bookingsRouter = require('./routes/bookings');

var app = express();
const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/trips', tripsRouter);
app.use('/baskets', basketsRouter);
app.use('/bookings', bookingsRouter);

module.exports = app;
