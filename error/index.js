var path = require('path');
var util = require('util');
var http = require('http');

// ошибки для выдачи посетителю
function HttpError(status, message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, HttpError); // т.к ошибка, то обязательно captureStackTrace

  this.status = status; // числовой статус ошибки
  // STATUS_CODES содержит встроенное описание ошибки, например для 404 - Not Found
  this.message = message || http.STATUS_CODES[status] || "Error";
}

util.inherits(HttpError, Error); // HttpError наследует от объекта Error

HttpError.prototype.name = 'HttpError';

exports.HttpError = HttpError;
