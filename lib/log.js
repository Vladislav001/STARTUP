///////////////////////////////////////////////////////////////
// В lib те модули и файлы, которые вроде как особо никуда/////
// не попадают, но куда-то их положить-то нужно          //////
///////////////////////////////////////////////////////////////

// Модуль: логгер - 'winston'

var winston = require('winston');
 // получаем окружение(по-сути app.get('env') - но в log.js нету app,
// а подключать только ради переменной окружения одной не имеет смысла
var ENV = process.env.NODE_ENV;

// can be much more flexible than that O_o
function getLogger(module) {

  var path = module.filename.split('/').slice(-2).join('/');

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: (ENV == 'development') ? 'debug' : 'error',
        label: path
      })
    ]
  });
}

module.exports = getLogger;
