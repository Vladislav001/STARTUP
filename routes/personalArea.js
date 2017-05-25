var user = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

var links = [];  // массив в котором будут храниться сформированные адреса профилей юзеров
var usernames = []; // хранит имена юзеров

user.find({}, function(err, doc) { 
	for(var i = 0; i < doc.length; i++) {

		links.push("/id" + doc[i]._id);  // добавляем в конец links очередную id
		usernames.push(doc[i].username);
	}
});





exports.get = function(req, res) {

  res.render('personalArea', {links: links, usernames: usernames});

   
};