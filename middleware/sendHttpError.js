module.exports = function(req, res, next) {

  // Этот метод ставит соответствующий статус
  res.sendHttpError = function(error) {

    res.status(error.status);
    // Если ajax запрос
    if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
      res.json(error); // то отправляем запрос вот так
    } else {
      res.render("error", {error: error}); // если же обычный запрос
    }
  };

  next(); // просто передаем управление дальше

};
