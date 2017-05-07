var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {
  // Каждый 'get' подключает соотсветсвующий модуль и вызывает его метод 'get'
  app.get('/', require('./home').get); // обрабатываемая корневая страница(начальная)
  app.get('/catalog', require('./catalog').get);
  app.get('/login', require('./login').get);
  app.post('/login', require('./login').post); // при poste на login, подключаем post этого модуля()
  app.get('/registration', require('./registration').get);
  app.post('/registration', require('./registration').post);
  app.get('/ruleSite', require('./ruleSite').get);
  app.post('/logout', require('./logout').post);
  app.get('/personalArea', checkAuth, require('./personalArea').get); // вставили middleware проверки авторизованности пользователя

  app.post('/updatePersonalData', require('./updatePersonalData').post);
  
  app.get('/publicProfile', require('./publicProfile').get); // обрабатываемая корневая страница(начальная)
};
