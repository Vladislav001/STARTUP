// Загружать юзера перед роутом
var User = require('../models/user').User;

module.exports = function(req, res, next) {
  req.user = res.locals.user = null; // если юзер не авторизован - он есть,но null

  if (!req.session.user) return next(); // если юзера нету, то продолжаем выполнение

  // Если есть, то получаем и записываем в св-во req
  User.findById(req.session.user, function(err, user) {
    if (err) return next(err);

    req.user = res.locals.user = user; // все что записываем в спец.метод  res.locals.user - будет
                                      //доступно всем шаблонам(для перерисовки - вход/выход)
    next(); // идем дальше
  });
};
