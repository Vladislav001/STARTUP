exports.post = function(req, res) {
  req.session.destroy(); // уничтожить сессию
  res.redirect('/'); // перенаправить посетителя на главную
};
