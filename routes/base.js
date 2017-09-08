const express = require("express");
const User = require("../models/index");
const Message = require("../models/index");
const models = require("../models/index")
const LocalStrategy = require('passport-local').Strategy;
const app = require("../server.js");
const router = express.Router();
const bcrypt = require("bcrypt");

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
const isAuthenticated = function (req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }
}





module.exports = router;
