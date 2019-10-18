const express = require('express');
const os = require('os');
const path = require('path');
let sequelize = require('sequelize');
let indexRouter = require('./routes/index');
var userRouter = require("./routes/users-router");
const app = express();

app.use(express.static('dist'));

app.set("view engine", "ejs");
app.listen(4000, () => console.log('Listening on port 4000!'));

app.get('/', indexRouter);
app.use("/users", userRouter);


app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



module.exports = app;
