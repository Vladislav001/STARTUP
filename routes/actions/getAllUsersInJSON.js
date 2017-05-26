var express = require('express');
var User = require('../../models/user').User;
var HttpError = require('../../error').HttpError;
var AuthError = require('../../models/user').AuthError;

// Получаем json - всех пользователей
exports.get = function(req, res, next) {
  User.find({}, function(err, users) {
     if (err) return next(err);
     res.json(users);
  })
 };
