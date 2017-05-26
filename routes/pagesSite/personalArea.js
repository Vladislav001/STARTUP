var User = require('../../models/user').User;
var HttpError = require('../../error').HttpError;
var AuthError = require('../../models/user').AuthError;

exports.get = function(req, res) {

	var links = [];  // массив в котором будут храниться сформированные адреса профилей юзеров
	var usernames = []; // хранит имена юзеров

	User.find({}, function(err, doc, next) {
		for(var i = 0; i < doc.length; i++) {

			links.push("/id" + doc[i]._id);  // добавляем в конец links очередную id
			usernames.push(doc[i].username);
		}
		res.render('personalArea', {links: links, usernames: usernames});
	});
};
