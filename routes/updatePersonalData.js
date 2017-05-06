// Модуль регистрации

var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;
var async = require('async');


exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
    // P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
  // т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные
  var username = req.user.username;
  var email =  "Emdd3 3333123"; // разобрал их и записал все поля формы в соответствующие сва-ва req.body
  var gender = req.user.gender;
  var updateGender;


   // разобрал их и записал все поля формы в соответствующие сва-ва req.body
  User.updatePersonalData(username, email, gender, function(err, user) {

    if (err) {
      if (err instanceof AuthError) { // если это ошибка и AuthError
        return next(new HttpError(403, err.message)); //403 - отказ обновления
      } else { // если какая-то друга ошибка: БД и т.п
        return next(err);
      }
    }

    //req.session.user = user._id; //сохранить _id посетителя в сесиии и ответить 200
    //res.send({}); // ответ(отправить объект) - p/s это мб объект с информацией о пользователе
    res.redirect('/personalArea'); // перенаправить посетителя на главную

    console.log("This USER = " + username,  email, gender, updateGender);
  });

};
