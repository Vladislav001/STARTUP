var nconf = require('nconf'); // модуль для конфигурирования
var path = require('path');

// Стандартная конфигурация (с офф.сайта пример)
nconf.argv()
  .env()
  .file({ file: path.join(__dirname, 'config.json') }); // указываем путь

module.exports = nconf;
