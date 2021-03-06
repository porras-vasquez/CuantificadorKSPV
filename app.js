const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
require('./passport/local-auth');
const session = require('express-session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
//var loginRouter = require('./routes/login');
const companiesRouter = require('./routes/companies');
const electricitiesRouter = require('./routes/electricities');
const gasesRouter = require('./routes/gaseslp');
const fuelsAndOilRouter = require('./routes/fuelsAndOil');
const airConditioningRouter = require('./routes/airConditioning');

const flash = require('connect-flash');


const app = express();

let port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    //store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));
app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/login', loginRouter);
app.use('/companies', companiesRouter);
app.use('/electricities', electricitiesRouter);
app.use('/gaseslp', gasesRouter);
app.use('/fuelsAndOil',fuelsAndOilRouter);
app.use('/airConditioning',airConditioningRouter);

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