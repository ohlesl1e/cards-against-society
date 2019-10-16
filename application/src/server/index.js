const express = require('express');
const os = require('os');
const path = require('path');
let sequelize = require('sequelize');
let indexRouter = require('./routes/index');

const app = express();

app.use(express.static('dist'));

app.listen(8080, () => console.log('Listening on port 4000!'));

app.get('/', indexRouter);

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
