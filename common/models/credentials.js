'use strict';

module.exports = function(Credentials) {
  Credentials.observe('after save', function (ctx, next) {
    // The first user is automatically created, called webadmin.
    // He does not have a coresponding author to go with him. 
    if (ctx.instance.username == "webadmin")
      next();
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
