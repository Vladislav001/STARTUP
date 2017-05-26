var express = require('express');
var User = require('../../models/user').User;
var HttpError = require('../../error').HttpError;
var AuthError = require('../../models/user').AuthError;
var mongoose = require('../../lib/mongoose');

// Очищаем Базу Данных
exports.get = function(req, res) {
  mongoose.connection.db.dropDatabase(); // Очистить ВСЮ БД
  res.redirect('/'); // перенаправляем на главную
};
