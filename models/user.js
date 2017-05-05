// В папке models хранятся модели(т.е объекты) для работы с данными

var crypto = require('crypto');
var async = require('async'); // - т.е чтобы не писать просто на колбэках + доп.возможности(у нас waterfall)
var util = require('util');

var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema; //описание сущности

var schema = new Schema({
  // Объявляем объекты с полем 'username'
  username: {
    type: String,
    unique: true, // т.е этот username будет уникален в БД( + сам mongoose не проверяет unique - это делает БД )
    required: true // т.е это поле('username') ОБЯЗЯТЕЛЬНО должно быть
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  gender: { // Половая принадлежность
    type: String,
    required: true,
    default: "Undefined"
  },
  numberInvoice: { // Унаикальный номер счета
    type: String,
    unique: true,
    required: true,
    default:  'R' + Math.floor(Math.random() * (123456789000 - 5 + 1)) + 5 // Случайной целое 12-13 значное число
  },
  balanceInvoice: { // Баланс пользователя
    type: Number,
    required: true,
    default: 0
  },
  created: { // Дата регистрации
    type: Date,
    default: Date.now
  }
});

// Шифрование пароля
schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password') // само значение 'password' в БД не хранится
  .set(function(password) {
    this._plainPassword = password;
    //Создаем некоторый случайный ключ
    this.salt = Math.random() + ''; // а это уже сохраняется в БД
    // Результат криптограф-ой фун-ии ('encryptPassword') m.е sha1(salt + password)
    this.hashedPassword = this.encryptPassword(password); // и это сохряняется в БД
  })
  .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(username, password, callback) {
  var User = this;

  async.waterfall([ // получаем массив задач и выполняет их одну за другой(рез-ты из одной фун-ии в другую идут)
    function(callback) {
      User.findOne({username: username}, callback); // найти одно значение у которого username будет username
    },
    function(user, callback) {
      if (user) { // если юзер найден
        if (user.checkPassword(password)) { // если у него верен пароль
          callback(null, user); // обрабатываем успешно авторизацию
        } else {
          callback(new AuthError("Пароль неверен")); // ошибка 403
        }
      } else { // если не нашли такого юзера
        callback(new AuthError("Пользователь не найден"));
      }
    }
  ], callback);
};

schema.statics.registration = function(username, password, email, gender, callback) {
  var User = this;

  async.waterfall([ // получаем массив задач и выполняет их одну за другой(рез-ты из одной фун-ии в другую идут)
    function(callback) {
      User.findOne({username: username}, callback);
    },
    function(user, callback) {
      // регистрируем нового юзера, если такого нету
      var user = new User({username: username, password: password, email: email, gender: gender});
      // Сохранить этот объект (нового пользователя) в БД (запишем в коллекцию Users)
      user.save(function(err) {
        if (err) return callback(new AuthError("Такой пользователь уже зарегистрирован"));
        callback(null, user); // обрабатываем успешно регистрацию
      });
    }
  ], callback);
};

schema.statics.updatePersonalData = function(username, email, gender, callback) {
  var User = this;

    User.findOneAndUpdate({username}, { $set: {email: email, gender: gender}},callback);
    console.log("This USER in Users= " + username,  email, gender);
  };



// Для того, чтобы наш класс умел сохранаться и искаться в БД
// Примечание: как только объявляем model - mongoose создает все индексы, которые нужны для поодержки schema
exports.User = mongoose.model('User', schema); // генерируется коллекция Users(добавляется 's')

// Своя собственная ошибка(для моего вывода)
function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;
