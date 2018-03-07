'use strict';

module.exports = function(Bot) {
  Bot.disableRemoteMethodByName('create');
  Bot.disableRemoteMethodByName('upsert');
  Bot.disableRemoteMethodByName('deleteById');
  Bot.disableRemoteMethodByName('updateAll');
  Bot.disableRemoteMethodByName('createChangeStream');
  Bot.disableRemoteMethodByName('exists');

  Bot.upload = function (ctx,options,callback) {
    if(!options) options = {};
    ctx.req.params.container = 'botdll';
    Bot.app.models.UserUpload.upload(ctx.req,
                                     ctx.result,
                                     options,
                                     function (err, fileObj) {
      if(err) {
        callback(err);
      } else {
        Bot.app.models.Author.find(
        {"where": {"credentialsId": fileObj.fields.user_id} },
        function (err, user) {
          var fileInfo = fileObj.files.file[0];
          Bot.create({
              name: fileObj.fields.bot_name,
              // We are filtering by id, there can only be one. Use user[0].
              author: user[0].username,
              race: fileObj.fields.bot_race,
              dll: '/api/user-uploads/download/'+fileInfo.name
          }, function (err,obj) {
            if (err !== null) {
              callback(err);
            } else {
              callback(null, obj);
            }
          });
        });
      }
    });
  };

  Bot.remoteMethod(
    'upload',
    {
      description: 'Uploads a file',
      accepts: [
        { arg: 'ctx', type: 'object', http: { source:'context' } },
        { arg: 'options', type: 'object', http:{ source: 'query'} }
      ],
      returns: {
        arg: 'fileObject', type: 'object', root: true
      },
      http: {verb: 'post'}
    }
  );
};
