const express = require("express");
const User = require("../models/index");
const Message = require("../models/index");
const models = require("../models/index")
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy
const router = express.Router();
const bcrypt = require("bcrypt");

passport.use(new BasicStrategy(
  function(username, password, done) {
      const userPassword = users[username];
      if (!userPassword) { return done(null, false); }
      if (userPassword !== password) { return done(null, false); }
      return done(null, username);
  }
));

const requireLogin = function (req, res, next) {
  if (req.user) {
    console.log(req.user)
    next()
  } else {
    res.redirect('/');
  }
};

const login = function (req, res, next) {
  if (req.user) {
    res.redirect("/language")
  } else {
    next();
  }
};


const datahere = {
  id:1,
  username:"Aaron",
  password:"akljsdflkajlsjdfkljlfja",
  salt: "lkjkajsifio",
  admin: false
}
router.get('/authorize',
    passport.authenticate('basic', {session: false}),
    function (req, res) {
        res.json({"hello": req.user})
    }
);


router.get('/api/hello',
    passport.authenticate('basic', {session: false}),
    function (req, res) {
        res.json({"hello": req.user})
    }
);

module.exports = router;
