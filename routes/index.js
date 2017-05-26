var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {
  // Каждый 'get' подключает соотсветсвующий модуль и вызывает его метод 'get'
  app.get('/', require('./pagesSite/home').get); // обрабатываемая корневая страница(начальная)
  app.get('/catalog', require('./pagesSite/catalog').get);
  app.get('/faq', require('./pagesSite/faq').get);
  app.get('/contacts', require('./pagesSite/contacts').get);
  app.get('/aboutUs', require('./pagesSite/aboutUs').get);
  app.get('/login', require('./login').get);
  app.post('/login', require('./login').post); // при poste на login, подключаем post этого модуля()
  app.get('/registration', require('./registration').get);
  app.post('/registration', require('./registration').post);
  app.get('/ruleSite', require('./pagesSite/ruleSite').get);
  app.post('/logout', require('./logout').post);
  app.get('/personalArea', checkAuth, require('./pagesSite/personalArea').get); // вставили middleware проверки авторизованности пользователя

  app.post('/updatePersonalData', require('./actions/updatePersonalData').post);
  app.post('/updatePersonalPublicData', require('./actions/updatePersonalPublicData').post);
  //app.get('/id:idTag', require('./actions/getUserById').get); //Пока непонятно как передавать и id
  app.get('/publicProfile', require('./pagesSite/publicProfile').get); // обрабатываемая корневая страница(начальная)

  app.get('/getAllUsersInJSON', require('./actions/getAllUsersInJSON').get);
  app.get('/dropDatabase', require('./actions/dropDatabase').get);
};
