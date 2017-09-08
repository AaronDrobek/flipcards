
const express = require("express");
const mustacheExpress = require("mustache-express");
const path = require("path");
const routes = require("./routes/index");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require('passport');
const BasicStrategy = require("passport-http").BasicStrategy;
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('express-flash-messages');
const model = require("./models/index");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const app = express();




app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.set("layout", "layout");


const authenticateUser = function(username, password, done) {
  model.User.findOne({
    where: {
      'username': username.toLowerCase()
    }
  }).then(function (user) {
    if (user == null) {
      return done(null, false, { message: 'Invalid email and/or password: please try again' })
    }

    let hashedPassword = bcrypt.hashSync(password, user.salt)

    if (user.password === hashedPassword) {
      return done(null, user)
    }

    return done(null, false, { message: 'Invalid email and/or password: please try again' })
  })
}

passport.use(new LocalStrategy(authenticateUser))
passport.use(new BasicStrategy(authenticateUser))

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  model.User.findOne({
    where: {
      'id': id
    }
  }).then(function (user) {
    if (user == null) {
      done(new Error('Wrong user id'))
    }

    done(null, user)
  })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan("dev"));

app.listen(3000, function() {
  console.log("App is running on localhost:3000");
});
