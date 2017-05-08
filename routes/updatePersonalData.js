// Модуль обновления личных данных

var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;
var async = require('async');

exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
    // P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
  // т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные
  // разобрал их и записал все поля формы в соответствующие сва-ва req.body

  var id = req.user.id;
  var updateUsername = req.body.username; // получаем имя пользователя по его полЮ!!!
  var updateEmail = req.body.email; // получаем email пользователя полЮ ввода!!!
  var updateGender = req.body.gender;
  var updateAboutMySelf = req.body.aboutMySelf;
  var updateMyAvatar = req.body.myAvatar;

   // разобрал их и записал все поля формы в соответствующие сва-ва req.body
  User.updatePersonalData(id, updateEmail, updateGender, updateAboutMySelf, updateMyAvatar, function(err, user) {

    if (err) {
      if (err instanceof AuthError) { // если это ошибка и AuthError
        return next(new HttpError(403, err.message)); //403 - отказ обновления
      } else { // если какая-то друга ошибка: БД и т.п
        return next(err);
      }
    }

    //req.session.user = user._id; //сохранить _id посетителя в сесиии и ответить 200
    //res.send({}); // ответ(отправить объект) - p/s это мб объект с информацией о пользователе
    res.redirect('/personalArea'); // обновим ЛК

    console.log("This AVATAR = " + updateMyAvatar);
  });

};
