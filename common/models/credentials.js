'use strict';

module.exports = function(Credentials) {
  Credentials.observe('after save', function (ctx, next) {
    ctx.instance.authors.create({
      "username": ctx.instance.username,
      "avatar": "",
      "website": "",
      "github": "",
      "realname": "",
      "credentialsId": ctx.instance.id
    });
    next();
  });
};
