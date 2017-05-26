// Пока не реализовано!!!

var express = require('express');
var User = require('../../models/user').User;
var HttpError = require('../../error').HttpError;
var AuthError = require('../../models/user').AuthError;

// Получение профиля юзера по его адресу
// получаем из адреса id юзера /id... (например http://localhost:3000/id59177e626aaba40fb049bfd3)
exports.get = function(req, res, next) {
  // Проверим id это или нет - подключили ObjectId
  try {
      var id = new ObjectId(req.params.idTag);
  } catch(err) {
    return next(404);
  }

  // ищем окумент в коллекции юзеров по данному id
  User.findById(req.params.idTag, function(err, user) {
    if (err) return next(err);

    // рисуем профиль юзера с данными из его документа
      res.render('publicUserProfile',
      	{USERNAME: user.username,
      	 GENDER: user.gender,
      	 EMAIL: user.email,
      	 ABOUT: user.aboutMySelf,
      	 CREATED: user.created,
         MYAVATAR: user.myAvatar
      	});
    });
  };
